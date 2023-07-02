import classes from './StreamerDetail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch, faYoutube, faTiktok, faRumble, faKickstarter } from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';


const getIconByPlatform = (platform) => {
    switch (platform) {
        case "twitch":
            return faTwitch;
        case "youtube":
            return faYoutube;
        case "tiktok":
            return faTiktok;
        case "rumble":
            return faRumble;
        case "kick":
            return faKickstarter;
        default:
            return null;
    }
};

function StreamerDetail(props) {

    const icon = getIconByPlatform(props.platform);

    const [rating, setRating] = useState(false);

    const upvoteHandler = (event) => {
        event.preventDefault();
        const data = {
            vote: 1,
            id: props.id
        }
        props.onVote(data);
        setRating(true);
    }

    const downvoteHandler = (event) => {
        event.preventDefault();
        const data = {
            vote: -1,
            id: props.id
        }
        props.onVote(data);
        setRating(true);
    }

    return (
        <div className={classes.wrap}>
            <section className={classes.detail}>
                <h1 className={classes.title}>Name: {props.name}</h1>
                <FontAwesomeIcon icon={icon} className={classes.icon} />
                <h1 className={classes.title}>{props.description}</h1>
                {rating && <h1 className={classes.title}>Rating: {props.votesSum}</h1>}
                {!rating && <h1 className={classes.title}>Vote to see rating!</h1>}
                <div>
                    <button className={classes.upvoteButton} onClick={upvoteHandler}>+</button>
                    <button className={classes.downvoteButton} onClick={downvoteHandler}>-</button>
                </div>
            </section>
            <img src='https://i1.sndcdn.com/artworks-fEAIFQLyizyHQ3Dh-anhykg-t500x500.jpg' />
        </div>
    );
}

export default StreamerDetail;