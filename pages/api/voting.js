import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'PUT') {
        const data = req.body;
        const streamer_id = data.id;
        const vote = parseInt(data.vote);

        const client = await MongoClient.connect('mongodb+srv://admin333:********@streamercluster.tglmjqw.mongodb.net/streamers?retryWrites=true&w=majority');
        const db = client.db();
        const votesCollection = db.collection('votes');
        const existingDoc = await votesCollection.findOne({ streamer_id: streamer_id });
        const newDoc = { streamer_id: streamer_id, votes: [vote] };

        if (existingDoc) {
            const updatedRatings = [...existingDoc.votes, vote];
            await votesCollection.updateOne({ streamer_id: streamer_id }, { $set: { votes: updatedRatings } });
        } else {
            await votesCollection.insertOne(newDoc);
        }

        const result = await votesCollection.aggregate([
            { $match: { streamer_id: streamer_id } },
            { $unwind: "$votes" },
            {
                $group: {
                    _id: "$_id",
                    votes: { $sum: "$votes" }
                }
            }
        ]).toArray();

        client.close();
        res.status(201).json({ message: 'Votes updated', vote: result[0].votes });
    }
}

export default handler;

