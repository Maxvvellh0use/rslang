import React from 'react';
import './Statistics.scss';
import { TEXT } from '../constants';
import StatisticElement from './StatisticElement/StatisticElement';
import BlockWindow from '../BlockWindow/BlockWindow'

const Statistics = (props) => {
    if (!props.showStatistics) { return null };

    const statistics = localStorage.statistics;
    const statisticsArray = (statistics) ? JSON.parse(statistics) : null;

    return (
        <BlockWindow>
            <div className={`${props.className} statistics`}>
                <h3 className='statistics__heading'>
                    {TEXT.STATISTICS.HEADING}
                </h3>

                {statistics ?
                    <div className='statistics__stats-wrap'>
                        {
                            statisticsArray.map((element, index) => {
                                return (
                                    <StatisticElement
                                        key={index}
                                        className='statistics__statistic-element'
                                        date={element.date}
                                        time={element.time}
                                        spokenWords={element.spokenWords.join(', ')}
                                        unspokenWords={element.unspokenWords.join(', ')}
                                        group={element.group}
                                    />
                                )
                            })
                        }
                    </div>
                    : <h5>{TEXT.STATISTICS.NO_STATS}</h5>
                    }

                <button
                    className='statistics__return-button'
                    onClick={props.onClick}
                >
                    {TEXT.STATISTICS.RETURN}
                </button>

            </div>
        </BlockWindow>
    )
}
export default Statistics;
