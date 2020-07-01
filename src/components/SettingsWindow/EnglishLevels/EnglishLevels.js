import React from 'react';
import { ENGLISH_LEVELS_ARRAY } from '../constants'

const EnglishLevels = (props) => {
    const englishLevels = ENGLISH_LEVELS_ARRAY.map((level, index) => {
        return (<option
            key={index}>
            {level}
        </option>
        )
    });

    return (<select
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}>
        {englishLevels}
    </select>)
}

export default EnglishLevels;