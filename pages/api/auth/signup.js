import { hashPassword } from "@/lib/auth";
import { getDatabase } from "@/lib/mongoConnection";
import { v4 as uuid } from "uuid";


async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    if (!firstName || !email || !password || !confirmPassword || !confirmPassword) {
        res.status(400).send({message: `Invalid Input.`});
        return;
    }

    if (!email.includes('@')) {
        res.status(400).send({message: `Invalid email.`});
        return;
    }

    if (password.trim().length < 7) {
        res.status(400).send({message: `Password should be at least 7 characters long.`});
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).send({message: `Passwords don't match.`});
        return;
    }

    const db = await getDatabase();
    const usersCollection = await db.collection('users');
    const existingUser = await usersCollection.findOne({email});
    if (existingUser) {
        res.status(400).send({message: `User already exists.`});
        return;
    }
    const hashedPassword = await hashPassword(password);
    const uid = uuid().split('-').join('').slice(0, 10);
    const data = await usersCollection.insertOne({firstName, lastName, email, password: hashedPassword, uid});
    res.status(200).send({data});
}

export default handler;