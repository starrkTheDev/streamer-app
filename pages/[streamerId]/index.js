import { MongoClient, ObjectId } from "mongodb";
import StreamerDetail from "components/StreamerDetail";
import { useState } from "react";

const DetailPage = (props) => {

    const [votesSum, setVotesSum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    async function voteHandler(enteredData) {
        const response = await fetch('/api/voting?id=streamer_id', {
            method: 'PUT',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setVotesSum(data.vote);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <StreamerDetail
                name={props.streamerData.name}
                id={props.streamerData.id}
                platform={props.streamerData.platform}
                description={props.streamerData.description}
                votesSum="Loading..."
                onVote={voteHandler}
            />
        )
    } else {
        return (
            <StreamerDetail
                name={props.streamerData.name}
                id={props.streamerData.id}
                platform={props.streamerData.platform}
                description={props.streamerData.description}
                votesSum={votesSum}
                onVote={voteHandler}
            />
        )
    }
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://admin333:********@streamercluster.tglmjqw.mongodb.net/streamers?retryWrites=true&w=majority');
    const db = client.db();
    const streamersCollection = db.collection('streamers');
    const streamers = await streamersCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: "blocking",
        paths: streamers.map(streamer => ({
            params: { streamerId: streamer._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {
    const streamerId = context.params.streamerId;
    const client = await MongoClient.connect('mongodb+srv://admin333:********@streamercluster.tglmjqw.mongodb.net/streamers?retryWrites=true&w=majority');
    const db = client.db();
    const streamersCollection = db.collection('streamers');
    const selectedStreamer = await streamersCollection.findOne({
        _id: new ObjectId(streamerId),
    });



    client.close();

    return {
        props: {
            streamerData: {
                id: selectedStreamer._id.toString(),
                name: selectedStreamer.name,
                platform: selectedStreamer.platform,
                description: selectedStreamer.description
            }
        }
    }
}

export default DetailPage;
