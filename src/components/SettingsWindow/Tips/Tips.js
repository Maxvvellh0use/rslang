import React from 'react';
<<<<<<< HEAD
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
=======
import { TIPS } from '../../../constants/constants'

const Tips = (props) => {
    const tipsCheckboxes = TIPS.map((tip, index) => {
        return (
            <label key={index}>
                <input
                    name={tip.name}
                    type={tip.type}
                    defaultChecked={props.isActive[tip.name]}>
>>>>>>> f61aae8de31988acec9859007ba208044d0995d9
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