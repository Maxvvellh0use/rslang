import React from 'react';
import UserWords from '../../data/UserWords';
import GraphDays from './GraphDays';
import GraphWords from './GraphWords';
import { NavLink, Switch, Route } from "react-router-dom";

class StatsContainer extends React.Component {
    state = {
        page: 1,
        longStats: [],
        days: [],
        count: [],
        statsData: [],
        data: {
            labels: [],
            datasets: [
                {
                    label: "Карточек завершено",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    data: []
                },
            ]
        }
    }

    componentDidMount = async () => {
        let userWords = [];
        const currentUser = JSON.parse(localStorage.user);
        try {
            userWords = await UserWords.getAllUserWordsData(currentUser);
        }
        catch (error) {
          console.log(error);
        };

        const statsData = userWords.map((word) => {
            return {
                wordId: word.id,
                lastUse: word.optional.lastUse,
                timeStamp: Date.parse(word.optional.lastUse),
            }
        })
        
        this.setState({
            statsData: statsData,
        })
    }

    render = () => {
        return (
            <section className="stats_wrapper">
                <div className="stats_container">
                    <h2>Мои результаты</h2>
                    <div>
                        <ul className="list-unstyled list-inline">
                            <li className="list-inline-item">
                                <NavLink to="/main/stats/stats">Статистика</NavLink>
                            </li>
                            <li className="list-inline-item">
                                <NavLink to="/main/stats/words">Слова</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <Switch>
                    <Route path="/main/stats/stats">
                        <GraphDays data={this.state.statsData} />
                    </Route>
                    <Route path="/main/stats/words">
                        <GraphWords data={this.state.statsData} />
                    </Route>
                </Switch>
            </section>
        )
    }
}

export default StatsContainer;