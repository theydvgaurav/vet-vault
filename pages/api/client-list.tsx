import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method=="GET")
            console.log(req)
        const client = await clientPromise;
        const db = client.db("bumpdatein");
        const users = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}