import React from "react";
import StreamerItem from "./StreamerItem";
import classes from "./StreamerList.module.css";

const StreamerList = (props) => {

    return (
        <ul className={classes.list}>
            {props.streamers?.map((streamer) => (
                <StreamerItem
                    key={streamer.id}
                    id={streamer.id}
                    name={streamer.name}
                    platform={streamer.platform}
                />
            ))}
        </ul>
    )
}

export default StreamerList;