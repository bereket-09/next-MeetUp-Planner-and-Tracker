// /api/new-meetup

//post request only
import { MongoClient } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://nextjs-2022:nextjs2022@cluster0.bmmne.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne({ data });
    console.log("🚀 ~ file: new-meetup.tsx:20 ~ handler ~ result", result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;
