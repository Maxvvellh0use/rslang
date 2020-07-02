import React from "react"
import { Link } from "react-router-dom";

const StartScreen = () => {
    return (
        <div className="start_screen_wrapper">
            <Link to="/audio_call">
                <div className="start_screen__button">START</div>
            </Link>
        </div>
    )
}

export default StartScreen;
