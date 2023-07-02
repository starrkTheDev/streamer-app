import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://admin333:sl4b33lo@streamercluster.tglmjqw.mongodb.net/streamers?retryWrites=true&w=majority')

        const db = client.db();
        const streamersCollection = db.collection('streamers');
        const result = await streamersCollection.insertOne(data);
        client.close();
        res.status(201).json({ message: 'Streamer inserted' })
    }
}

export default handler;