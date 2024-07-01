import PaymentMethodDetails from "@/components/checkout/payment-info.js/PaymentMethodDetails";
import PaymentMethodSelection from "@/components/checkout/payment-info.js/PaymentMethodSelection";
import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { isValidUser } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Index = ({paymentMethods, user}) => {
    const cart = useSelector(state => state.cart.cart);
    const billingInfo = useSelector(state => state.cart.billingInfo);
    const router = useRouter();
    const [selectedGateway, setSelectedGateway] = useState(paymentMethods[0].name);

    useEffect(() => {
        if (cart.length <= 0)
            router.push('/');
    }, [cart, router]);

    useEffect(() => {
        if (Object.values(billingInfo).length === 0)
            router.push('/checkout/billing-info');
    }, [billingInfo, router])

    return (
        <AnimateLayout>
            <Title title={'Payment Info'} />
            <div className="container px-5 lg:px-0 grid lg:grid-cols-2 gap-x-28 gap-y-10 mx-auto my-16">
                <PaymentMethodSelection
                    selectedGateway={selectedGateway}
                    setSelectedGateway={setSelectedGateway}
                    paymentMethods={paymentMethods}
                />
                <PaymentMethodDetails
                    paymentMethods={paymentMethods}
                    selectedPaymentMethod={selectedGateway}
                />
            </div>
        </AnimateLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const validUser = await isValidUser(ctx.req, ctx.res);

    if (!validUser) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    const db = await getDatabase();
    const paymentMethods = await db.collection('payment-methods').find({}).project({ _id: 0 }).toArray();
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const user = await db.collection('users').findOne({ email: session?.user?.email }, {
        projection: {
            _id:0
        }
    });

    return {
        props:{
            paymentMethods, user
        }
    }
}