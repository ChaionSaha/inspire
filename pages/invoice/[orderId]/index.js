import inspireLogo from '@/assets/logo-black.png';
import { isValidUser } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Index = ({ order, user }) => {
    const router = useRouter();

    return (
        <div className="w-[1120px] flex flex-col pb-10 px-5 mx-auto">
            <Head>
                <title>Inspire Invoice</title>
            </Head>
            <div className="flex justify-end w-full mt-5">
                <button onClick={()=>router.push('/profile')} className='text-xl'><i className='bi bi-x-lg'></i></button>
            </div>
            <Image className='self-center mt-5' src={inspireLogo} alt="Inspire Logo" />
            <div className="mt-5 flex justify-between">
                <div>


                    <p className='text-2xl font-bold'>{user.firstName} {user.lastName}</p>
                    <p className='text-lg'>{user.email}</p>
                </div>
                <button onClick={()=>window.print()} className='btn'>Print <i className='bi bi-printer'></i></button>
            </div>

            <p className='mt-10 text-xl font-bold'>Billing Details:</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xl">
                <p>Order ID: <span className='font-semibold'>{order.orderId}</span></p>
                <p>
                    Billing Name: {' '}
                    <span className='font-semibold'>
                        {order.billingInfo.firstName}
                        {order.billingInfo.lastName}
                    </span>
                </p>
                <p>Email: <span className='font-semibold'>{order.billingInfo.email}</span></p>
                <p>Phone Number: <span className='font-semibold'>{order.billingInfo.phone}</span></p>
            </div>

            <p className='mt-10 text-xl font-bold'>Payment Details:</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xl">
                <p>
                    Customer Account Number: <span className='font-semibold'>
                        {order.accountNumber}
                    </span>
                </p>
                <p>Transaction ID: <span className='font-semibold'>{order.trxId}</span></p>
                <p>Payment Method: <span className='font-semibold'>{order.selectedMethodDetails.name}</span></p>
                <p>Payment Number: <span className='font-semibold'>{order.selectedMethodDetails.number}</span></p>
            </div>

            <p className='mt-10 text-xl font-bold'>Products:</p>
            <div className="mt-3">
                <table className="table table-lg">
                    {/* head */}
                    <thead>
                        <tr className=" border-gray-300">
                            <th></th>
                            <th className="uppercase">Product Name</th>
                            <th className="uppercase">Product Color</th>
                            <th className="uppercase">Product Category</th>
                            <th className="uppercase">Product Size</th>
                            <th className="uppercase">Product Quantity</th>
                            <th className="uppercase">Product Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.cart.map((order, index) => (
                                <tr key={index} className=" border-gray-300">
                                    <th>{index + 1}</th>
                                    <td>
                                        {order.name}
                                    </td>
                                    <td>
                                        {order.color}
                                    </td>
                                    <td className=" capitalize">{order.cat }</td>
                                    <td >{order.selectedSize.name}</td>
                                    <td >{order.quantity }</td>
                                    <td >{order.price }</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={6} className='text-right font-bold'>Total Price:</td>
                            <td>{order.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const validUser = await isValidUser(ctx.req, ctx.res);
    if (!validUser)
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    
    const { req, res } = ctx;
    const { orderId } = ctx.query;
    
    const db = await getDatabase();
    const session = await getServerSession(req, res, authOptions);
    const user = await db.collection('users').findOne({ email: session?.user?.email }, {
        projection: {
            _id: 0,
            password: 0
        }
    });
    const order = await db.collection('orders').findOne({ orderId: orderId, user: user.uid }, {
        projection: {
            _id: 0
        }
    });
    console.log(order)

    if (!order) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

    return {
        props:{
            order, user
        }
    }
}