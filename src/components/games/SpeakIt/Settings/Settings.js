import React from 'react';
import './Settings.scss';

const GROUPS = [1, 2, 3, 4, 5, 6]

const Settings = (props) => {
    if (!props.showSettings) {
        return null
    }
    const className = props.className
    return (
        <div className={`${className} settings-si`}>
            <p className='settings-si__text'>Сложость:</p>
            {
                GROUPS.map((group, index) => {
                    return (
                        <div
                            key={index}
                            className='settings-si__group'
                        >
                            <input
                                id={`group-${index}`}
                                name='settings'
                                type='radio'
                                onClick={() => props.onClick(index)}
                                defaultChecked={props.checked === index}
                            />

                            <label htmlFor={`group-${index}`}>
                                {group}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Settings;