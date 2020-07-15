import React from 'react';
import './StatisticElement.scss';
import { TEXT } from '../../constants';

const StatisticElement = (props) => {
    return (
        <div className={`${props.className} statistic-element`}>
            <div className='statistic-element__date'>
                <p>{props.time}</p>
                <p>{props.date}</p>
            </div>

            <p>
                <span
                    className='statistic-element__item statistic-element__item_difficulty'
                >
                    {TEXT.STATISTICS.DIFFICULTY}
                </span>
                :&nbsp;{props.group}
            </p>
            <p>
                <span
                    className='statistic-element__item statistic-element__item_spoken'
                >
                    {TEXT.STATISTICS.SPOKEN}
                </span>
                :&nbsp;{props.spokenWords}
            </p>
            <p>
                <span
                    className='statistic-element__item statistic-element__item_unspoken'
                >
                    {TEXT.STATISTICS.UNSPOKEN}
                </span>
                :&nbsp;{props.unspokenWords}
            </p>
            {/* <hr /> */}
        </div>
    )
}
export default StatisticElement;