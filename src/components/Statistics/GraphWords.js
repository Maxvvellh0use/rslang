import React from 'react';
import { Line } from 'react-chartjs-2';
import "./Statistics.scss";

class GraphWords extends React.Component {
    state = {
        isSelected: false,
        data: {
            // labels: [ '0' ,'1000', '2000', '3000', '4000', '5000'],
            datasets: [
                {
                    label: "Слов изучено",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    data: [{x:0, y:0}, {x:50, y:4}]
                },
                {
                    backgroundColor: "rgba(0, 255, 0, 0.75)",
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

    render = () => {
        return (
            <div className="graph_words">
                    <h4>Слова</h4>
                    <div>Всего слов изучено:</div>
                    <div className="graph">
                        <Line 
                            options={this.state.options}
                            data={this.state.data}
                        />
                    </div>
                </div>
        )
    }
}

export default GraphWords;