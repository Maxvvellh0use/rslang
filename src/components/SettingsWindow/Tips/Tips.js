import React from 'react';
import { TIPS_ARRAY } from '../constants'

const Tips = (props) => {
    const tipsCheckboxes = TIPS_ARRAY.map((tip, index) => {
        return (
            <label key={index}>
                <input
                    readOnly={true}
                    name={tip.name}
                    type={tip.type}
                    checked={props.isActive[tip.name]}>
                </input>
                {tip.text}
            </label>
        )
    })

    return (<div
        className={props.className}
        onChange={props.onChange}>
        {tipsCheckboxes}
    </div>);
}

export default Tips;