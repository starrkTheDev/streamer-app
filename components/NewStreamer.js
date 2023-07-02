import React, { useRef } from "react"
import classes from "./NewStreamer.module.css";

const NewStreamer = (props) => {

    const nameInputRef = useRef();
    const platformInputRef = useRef();
    const descriptionInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value;
        const enteredPlatform = platformInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const streamerData = {
            name: enteredName,
            platform: enteredPlatform,
            description: enteredDescription
        };
        props.onAddStreamer(streamerData);
        descriptionInputRef.current.value = '';
        nameInputRef.current.value = '';
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono" rel="stylesheet"></link>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.wrap}>
                    <p className={classes.formTitle}>Add new streamer below!</p>
                    <div className={classes.flexdiv}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" required ref={nameInputRef} />
                    </div>
                    <div className={classes.flexdiv}>
                        <label htmlFor="platform">Platform:</label>
                        <select id="platform" required ref={platformInputRef}>
                            <option value="twitch">Twitch</option>
                            <option value="youtube">YouTube</option>
                            <option value="tiktok">TikTok</option>
                            <option value="kick">Kick</option>
                            <option value="rumble">Rumble</option>
                        </select>
                    </div>
                    <div className={classes.flexdiv}>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" className={classes.description} required ref={descriptionInputRef} />
                    </div>
                    <div className={classes.flexdiv}>
                        <button>Add Streamer</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewStreamer;