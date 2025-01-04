import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { signJWT } from './utils'
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { mobile, password } = req.body;
            if (!mobile || !password) {
                return res.status(400).json({ message: "Mobile and Password are required." });
            }
            const client = await clientPromise;
            const db = client.db("pinky");
            const user = await db
                .collection("adminUsers")
                .findOne({ mobile, password }, { projection: { _id: 0, password: 0 } });

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.status(200).json({ ...user, accessToken: signJWT(user) });
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
