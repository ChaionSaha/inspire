import { getDatabase } from "@/lib/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(422).send({ message: 'Method not allowed!' })
    }

    const db = await getDatabase();
    const categories = await db.collection('categories').find().project({ _id: 0 }).toArray();
    return res.status(200).json({ categories });
}