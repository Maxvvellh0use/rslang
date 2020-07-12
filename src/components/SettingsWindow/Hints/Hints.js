import React from 'react';

const Hints = (props) => {
    const hintsCheckboxes = props.workArray.map((hint, index) => {
        return (
            <label key={index}>
                <input
                    readOnly={true}
                    name={hint.name}
                    type={hint.type}
                    checked={props.isActive[hint.name]}>
                </input>
                {hint.text}
            </label>
        )
    })

    return (<div
        className={props.className}
        onChange={props.onChange}>
        {hintsCheckboxes}
    </div>);
}

export default Hints;