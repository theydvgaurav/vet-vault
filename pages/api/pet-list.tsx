import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { page = 1, limit = 12 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const client = await clientPromise;
        const db = client.db("pinky");

        const totalPets = await db.collection("pets").countDocuments();
        const pets = await db
            .collection("pets")
            .find({})
            .sort({ updatedAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .toArray();

        res.status(200).json({
            data: pets,
            totalPages: Math.ceil(totalPets / limitNumber),
            currentPage: pageNumber,
        });
    } catch (e) {
        console.error("Error fetching pets:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
