import React from 'react';
import { TIPS } from '../../../constants/constants'

const Tips = (props) => {
    const tipsCheckboxes = TIPS.map((tip, index) => {
        return (
            <label key={index}>
                <input
                    name={tip.name}
                    type={tip.type}
                    defaultChecked={props.isActive[tip.name]}>
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