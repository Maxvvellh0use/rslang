import React from "react";

const GraphHint = (props) => {

    return (
        <span>{props.item.day}: {props.item.wordsCount} слов</span>
    )
}

export default GraphHint;
