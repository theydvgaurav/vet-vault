import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { page = 1, limit = 12, date = new Date() } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        // Parse the date string (YYYY-MM-DD) to a Date object
        const startDate = new Date(date as string);
        // Set the time to 00:00:00 for the start of the day
        startDate.setHours(0, 0, 0, 0);

        // Calculate the end of the day (23:59:59)
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);

        const client = await clientPromise;
        const db = client.db("pinky");

        // Count the total number of events for that day
        const totalEvents = await db.collection("petEvents").countDocuments({
            date: { $gte: startDate, $lte: endDate }
        });

        // Find the events for that day with pagination
        const events = await db
            .collection("petEvents")
            .aggregate([
                {
                    $match: {
                        date: { $gte: startDate, $lt: endDate }
                    }
                },
                {
                    $lookup: {
                        from: "pets",
                        localField: "petId",
                        foreignField: "petId",
                        as: "petDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$petDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        eventType: 1,
                        petName: { $ifNull: ["$petDetails.petName", "Unknown Pet"] }, // Example field from petDetails
                        breed: "$petDetails.breed",
                        ownerName: "$petDetails.ownerName",
                        mobileNumber: "$petDetails.mobileNumber",
                        date: 1,
                        petId: 1,
                        updatedAt: 1 // Keep the updatedAt field from petEvents
                    }
                },
                {
                    $sort: { updatedAt: -1 }
                },
                {
                    $skip: (pageNumber - 1) * limitNumber
                },
                {
                    $limit: limitNumber
                }
            ])
            .toArray();

        // Return the paginated result
        res.status(200).json({
            data: events,
            totalPages: Math.ceil(totalEvents / limitNumber),
            currentPage: pageNumber,
        });
    } catch (e) {
        console.error("Error fetching pets:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
