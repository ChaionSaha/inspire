import AnimateLayout from "@/components/global/AnimateLayout";
import { isValidUser } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = ({user, userOrders=[]}) => {
    return (
        <AnimateLayout>
            <div className="container mx-auto my-10">
                <p className="text-3xl font-semibold">Hello {user.firstName} {user.lastName}</p>
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
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const user = await db.collection('users').findOne({ email: session?.user?.email }, {
        projection: {
            _id:0
        }
    });
    const userOrders = await db.collection('orders').find({ userId: user.uid },
        {
            projection: {
                _id: 0
            }
        }
    ).toArray();

    return {
        props:{
            user, userOrders
        }
    }
}