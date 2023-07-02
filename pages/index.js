import NewStreamer from "components/NewStreamer";
import { useRouter } from "next/router";
import StreamerList from "components/StreamerList";
import { MongoClient } from "mongodb";


const Form = (props) => {

    const router = useRouter();

    async function addStreamerHandler(enteredStreamerData) {
        const response = await fetch('/api/new-streamer', {
            method: 'POST',
            body: JSON.stringify(enteredStreamerData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);

        router.push('/');

    }

    return (
        <div>
            <NewStreamer onAddStreamer={addStreamerHandler} />
            <StreamerList streamers={props.streamers}
            />
        </div>
    )
}

export default Form;



export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://admin333:********@streamercluster.tglmjqw.mongodb.net/streamers?retryWrites=true&w=majority');
    const db = client.db();
    const streamersCollection = db.collection('streamers');
    const streamers = await streamersCollection.find().toArray();
    client.close();

    return {
        props: {
            streamers: streamers.map((streamer) => ({
                name: streamer.name,
                id: streamer._id.toString(),
                platform: streamer.platform,
                description: streamer.description
            }))
        },
        revalidate: 10
    }
}
