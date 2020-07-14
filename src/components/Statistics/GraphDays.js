import React from 'react';
import { Line } from 'react-chartjs-2';
import "./Statistics.scss";
import getLastWeek from './helpers/getLastWeek';
import compareData from './helpers/comapreData';

class GraphDays extends React.Component {
    state = {
        show: true,
        data: {
            labels: [],
            datasets: [
                {
                    label: "Карточек завершено",
                    backgroundColor: "rgba(0, 51, 102, 0.75)",
                    data: []
                },
            ]
        }
    }

    componentDidMount() {

        const statsData = this.props.data;
        const lastWeekDates = getLastWeek();
        const result = compareData(lastWeekDates, statsData);

        const days = result.map((item) => item.day);
        const count = result.map((item) => item.wordsCount);

        this.setState({
            data: {
                labels: days,
                datasets: [
                    {
                        label: "Карточек завершено",
                        backgroundColor: "rgba(0, 51, 102, 0.75)",
                        data: count
                    },
                ]
            }
        })
    }

    render = () => {
        return (
                <div className="graph_days">
                    <div className="graph">
                        <h4 className="graph_title">Статистика за неделю</h4>
                        <Line 
                            options={{
                                responsive: true
                            }}
                            data={this.state.data}
                        />
                    </div>
                </div>
        )
    }
}

export default GraphDays;