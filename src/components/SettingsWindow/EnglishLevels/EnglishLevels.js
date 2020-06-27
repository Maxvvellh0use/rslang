import React from 'react';
<<<<<<< HEAD
import { ENGLISH_LEVELS_ARRAY } from '../constants'

const EnglishLevels = (props) => {
    const englishLevels = ENGLISH_LEVELS_ARRAY.map((level, index) => {
=======
import { ENGLISH_LEVELS } from '../../../constants/constants'

const EnglishLevels = (props) => {
    const englishLevels = ENGLISH_LEVELS.map((level, index) => {
>>>>>>> f61aae8de31988acec9859007ba208044d0995d9
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