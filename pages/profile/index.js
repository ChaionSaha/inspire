import AnimateLayout from "@/components/global/AnimateLayout";
import Title from "@/components/global/Title";
import { isValidUser } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = ({ user, userOrders = [] }) => {
    
    const router = useRouter();

    return (
        <AnimateLayout>
            <Title title={'Profile'}/>
            <div className="container mx-auto my-10">
                <p className="text-3xl font-semibold">Hello {user.firstName} {user.lastName}</p>
                <p className="mt-10 text-xl font-medium">Your Orders</p>
                <div className="overflow-x-auto mt-5">
                    <table className="table table-lg">
                        {/* head */}
                        <thead>
                            <tr className=" border-gray-300">
                                <th></th>
                                <th className="text-base uppercase">Order ID</th>
                                <th className="text-base uppercase">Products</th>
                                <th className="text-base uppercase">Price</th>
                                <th className="text-base uppercase">Account Number</th>
                                <th className="text-base uppercase">Transaction ID</th>
                                <th className="text-base uppercase">Payment Method</th>

                                <th className="text-base uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userOrders.map((order, index) => (
                                    <tr key={index} className=" border-gray-300">
                                        <th className="text-xl">{index + 1}</th>
                                        <td className="text-xl">
                                            <button className="underline" onClick={()=>router.push(`/invoice/${order.orderId}`)}>
                                                {order.orderId}
                                            </button>
                                        </td>
                                        <td className="text-xl">
                                            {order.cart.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p>{item.name} ({item.selectedSize.name}) x {item.quantity}
                                                            {index === order.cart.length - 1 ? '.' : ','} </p>
                                                    </div>
                                                )
                                            })}
                                        </td>
                                        <td className="text-xl">$ {order.cart.reduce((acc,item)=>acc + (item.price * item.quantity), 0)}</td>
                                        <td className="text-xl">{order.accountNumber }</td>
                                        <td className="text-xl">{order.trxId }</td>
                                        <td className="text-xl">{order.selectedMethodDetails.name }</td>
                                        <td className={`text-xl ${order.status === 'pending' ? 'text-warning' : order.status === 'rejected' ? 'text-error' : 'text-success'}`}>
                                            {order.status === 'pending' ? 'Pending' : order.status === 'rejected' ? 'Rejected' : 'Accepted'}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
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
            _id: 0
        }
    });
    const userOrders = await db.collection('orders').find({ user: user.uid },
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