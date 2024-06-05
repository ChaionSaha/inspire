import { isValidUser } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = () => {
    return (
        <div>
            Enter
        </div>
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
    const user = await db.collection('users').findOne({ email: session?.user?.email });
    const userOrders = await db.collection('orders').find({ userId: user.uid }).toArray();

    return {
        props:{
            user, userOrders
        }
    }
}