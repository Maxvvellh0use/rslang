import React from 'react';
import { Line } from 'react-chartjs-2';
import "./Statistics.scss";

class GraphDays extends React.Component {
    state = {
        show: true,
        data: {
            labels: [],
            datasets: [
                {
                    label: "Карточек завершено",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    data: []
                },
                // {
                //     label: "Правильные ответы",
                //     backgroundColor: "rgba(0, 255, 0, 0.75)",
                //     data: [4, 15, 21, 0, 12, 4, 2]
                // }
            ]
        }
    }

    render = () => {
        return (
                <div className="graph_days">
                    <h1>Stats</h1>
                    <div>
                        <div>total words:</div>

                    </div>
                    <div className="graph">
                        <h3>Chart Sample</h3>
                        <Line 
                            options={{
                                responsive: true
                            }}
                            data={this.props.data}
                        />
                    </div>
                </div>
        )
    }
}

export default GraphDays;