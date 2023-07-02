import classes from "./StreamerItem.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch, faYoutube, faTiktok, faRumble, faKickstarterK } from "@fortawesome/free-brands-svg-icons";

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
        case "kickstarter":
            return faKickstarterK;
        default:
            return null;
    }
};

const StreamerItem = (props) => {

    const router = useRouter();

    const showDetailsHandler = () => {
        router.push("/" + props.id);
    }

    const icon = getIconByPlatform(props.platform);

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono" rel="stylesheet"></link>
            <li onClick={showDetailsHandler} className={classes.item}>
                <p className={classes.title}>{props.name}</p>
                <FontAwesomeIcon icon={icon} className={classes.icon} />
            </li>
        </>
    )
}

export default StreamerItem;

