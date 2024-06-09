
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { compare, hash } from 'bcryptjs';
import { getServerSession } from "next-auth";
import { getDatabase } from "./mongoConnection";

export async function hashPassword(input) {
    const hashedPassword = await hash(input, 12);
    return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}

export async function isValidUser(req, res) {
    let validity = false;
    const session = await getServerSession(req, res, authOptions);
    

    if (!session) {
        return validity;
    }

    const db = await getDatabase();
    const user = await db.collection('users').findOne({email: session?.user?.email});

    if (!user)
        return validity;

    return true;
}