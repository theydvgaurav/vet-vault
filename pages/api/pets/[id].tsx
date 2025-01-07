import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const eventConfig = {
    deworming: {
        frequency: 'monthly',
    },
    rabiesInjection: [
        { ageInDays: 90 },
        { ageInDays: 111 },
        { ageInDays: 291 },
        { repeatYearly: true, startAgeInDays: 291 }
    ],
    nineInOneInjection: [
        { ageInDays: 44 },
        { ageInDays: 65 },
        { ageInDays: 240 },
        { repeatYearly: true, startAgeInDays: 240 }
    ]
};

function generatePetEvents(petId: string | string[] | undefined, dob: string) {
    const events = [];
    const dobDate = new Date(dob);
    const today = new Date()

    // Deworming events (monthly)
    let currentDate = new Date(dobDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
    for (let i = 0; i < 15 * 12; i++) { // 15 years * 12 months
        events.push({
            petId,
            eventType: 'deworming',
            date: new Date(currentDate),
            createdAt: today, updatedAt: today
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Rabies injection events
    eventConfig.rabiesInjection.forEach(event => {
        if (event.ageInDays) {
            const eventDate = new Date(dobDate);
            eventDate.setDate(eventDate.getDate() + event.ageInDays);
            events.push({
                petId,
                eventType: 'rabiesInjection',
                date: eventDate,
                createdAt: today, updatedAt: today
            });
        }
        if (event.repeatYearly) {
            const startDate = new Date(dobDate);
            startDate.setDate(startDate.getDate() + event.startAgeInDays);
            for (let i = 0; i < 15; i++) {
                const yearlyDate = new Date(startDate);
                yearlyDate.setFullYear(yearlyDate.getFullYear() + i);
                events.push({
                    petId,
                    eventType: 'rabiesInjection',
                    date: yearlyDate,
                    createdAt: today, updatedAt: today
                });
            }
        }
    });

    // Nine-in-One injection events
    eventConfig.nineInOneInjection.forEach(event => {
        if (event.ageInDays) {
            const eventDate = new Date(dobDate);
            eventDate.setDate(eventDate.getDate() + event.ageInDays);
            events.push({
                petId,
                eventType: 'nineInOneInjection',
                date: eventDate,
                createdAt: today, updatedAt: today
            });
        }
        if (event.repeatYearly) {
            const startDate = new Date(dobDate);
            startDate.setDate(startDate.getDate() + event.startAgeInDays);
            for (let i = 0; i < 15; i++) {
                const yearlyDate = new Date(startDate);
                yearlyDate.setFullYear(yearlyDate.getFullYear() + i);
                events.push({
                    petId,
                    eventType: 'nineInOneInjection',
                    date: yearlyDate,
                    createdAt: today, updatedAt: today
                });
            }
        }
    });

    return events;
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "GET") {
            const petId = req.query.id
            const client = await clientPromise;
            const db = client.db("pinky");
            const pet = await db
                .collection("pets")
                .findOne({ petId }, { projection: { _id: 0, createdAt: 0, updatedAt: 0 } });
            if (!pet) {
                return res.status(404).json({ message: "Pet not found." });
            }
            res.status(200).json({ ...pet });
        }
        else if (req.method == "POST") {
            const body = req.body;
            const today = new Date()
            body.dateOfBirth = new Date(body.dateOfBirth);
            body.dateOfBirth = body.dateOfBirth.toLocaleDateString('en-CA')
            body.petId = uuidv4().toString();
            body.createdAt = today
            body.updatedAt = today
            const client = await clientPromise;
            const db = client.db("pinky");
            const pet = await db
                .collection("pets").insertOne({ ...body })
            if (pet.acknowledged) {
                const events = generatePetEvents(body.petId, body.dateOfBirth)
                await db
                    .collection("petEvents").insertMany(events)
            }
            res.status(200).json({ message: "Pet Added" });
        }
        else if (req.method == "PATCH") {
            const petId = req.query.id
            const body = req.body;
            body.dateOfBirth = new Date(body.dateOfBirth);
            body.dateOfBirth = body.dateOfBirth.toLocaleDateString('en-CA')
            body.updatedAt = new Date()
            console.log(body)
            const client = await clientPromise;
            const db = client.db("pinky");
            const pet = await db
                .collection("pets").updateOne({ petId }, { $set: { ...body } })
            if (pet.acknowledged) {
                await db
                    .collection("petEvents").deleteMany({ petId })
                const events = generatePetEvents(petId, body.dateOfBirth)
                await db
                    .collection("petEvents").insertMany(events)
            }
            res.status(200).json({ message: "Pet Updated" });
        }
        else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (e) {
        console.error(e);
    }
}