import { getDatabase } from '@/lib/mongoConnection';
import { getServerSession } from 'next-auth';
import { v4 as uuid } from 'uuid';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const orderId = uuid().split('-').join('').slice(0, 10);
    const status = 'pending';
    const db = await getDatabase();
    const formData = req.body;
    const session = await getServerSession(req, res, authOptions);
    const user = await db.collection('users').findOne({email: session.user.email});

    const data = await db.collection('orders').insertOne({
        ...formData, orderId, status, user: user.uid
    })

    res.status(201).json({message: 'Order placed successfully'});
}