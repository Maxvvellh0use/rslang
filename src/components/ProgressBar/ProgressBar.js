import React from "react";

function ProgressBar(props) {
    return (
        <div className="progress_block">
            <div className="progress_block__number">0</div>
            <div className="progress_block__bar"></div>
            <div className="progress_block__number">50</div>
        </div>
    );
}

export default ProgressBar;
