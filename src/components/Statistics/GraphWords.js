import React from 'react';
import { Line } from 'react-chartjs-2';
import "./Statistics.scss";
import correctWordsGraph from "./helpers/correctWordsGraph";
import ReactHover from "react-hover";
import getLastWeek from './helpers/getLastWeek';
import compareData from './helpers/comapreData';
import GraphHint from './GraphHint';

class GraphWords extends React.Component {
    state = {
        onWeekData: [],
        isSelected: false,
        totalWords: null,
        data: {
            // labels: [ '0' ,'1000', '2000', '3000', '4000', '5000'],
            datasets: [
                {
                    label: "Слов изучено",
                    backgroundColor: "rgba(0, 51, 153, 0.8)",
                    data: [{x:0, y:0}, {x:50, y:4}]
                },
                {   
                    label: "План",
                    backgroundColor: "rgba(0, 51, 153, 0.1)",
                    lineTension: 0.2,
                    data: [{x:0, y:0}, {x:1000, y:69}, {x:2000, y:80}, {x:3000, y:84}, {x:4000, y:90}, {x:5000, y:92}]
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
           },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10,
                    }
                }],
                xAxes: [{
                    beginAtZero: true,
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    }

    componentDidMount() {
        const statsData = this.props.data;
        const totalWordsX = statsData.length;
        const percentY = Math.ceil(correctWordsGraph(totalWordsX));

        const lastWeekDates = getLastWeek();
        const result = compareData(lastWeekDates, statsData);

        const days = result.map((item) => item.day);
        const count = result.map((item) => item.wordsCount);

        this.setState({
            onWeekData: result,
            totalWords: totalWordsX,
            data: {
                // labels: [ '0' ,'1000', '2000', '3000', '4000', '5000'],
                datasets: [
                    {
                        label: "Слов изучено",
                        backgroundColor: "rgba(0, 51, 153, 0.8)",
                        data: [{x:0, y:0}, {x:totalWordsX, y:percentY}]
                    },
                    {
                        label: "План",
                        backgroundColor: "rgba(0, 51, 153, 0.1)",
                        lineTension: 0.2,
                        data: [{x:0, y:0}, {x:1000, y:69}, {x:2000, y:80}, {x:3000, y:84}, {x:4000, y:90}, {x:5000, y:92}]
                    }
                ]
            },
        })
    }


    render = () => {
        const optionsCursorTrueWithMargin = {
            followCursor:true,
            shiftX:20,
            shiftY:0
        }
        
        return (
            <div className="graph_words">
                    <h4>Слова</h4>
                    <div>Всего слов изучено: {this.state.totalWords}</div>
                    <div className="graph">
                    <ReactHover options={optionsCursorTrueWithMargin}>
                        <ReactHover.Trigger type='trigger'>
                            <Line 
                                options={this.state.options}
                                data={this.state.data}
                            />
                        </ReactHover.Trigger>
                        <ReactHover.Hover type='hover'>
                            <ul className="list-unstyled">
                                {
                                this.state.onWeekData.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <GraphHint item={item} />
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </ReactHover.Hover>
                    </ReactHover>
                    </div>
                </div>
        )
    }
}

export default GraphWords;