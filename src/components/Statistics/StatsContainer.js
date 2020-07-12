import React from 'react';
import UserWords from '../../data/UserWords';
import getLastWeek from './helpers/getLastWeek';
import compareData from './helpers/comapreData';
import GraphDays from './GraphDays';
import GraphWords from './GraphWords';

class StatsContainer extends React.Component {
    state = {
        page: 1,
        longStats: [],
        days: [],
        count: [],
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

    componentDidMount = async () => {
        let filter;
        let userWords = [];
        const currentUser = JSON.parse(localStorage.user);
        try {
        //   filter = { "$and": [{ "userWord.optional.dictionaryTab": dictionaryTabName.learning }] };
        //   learningWordsAggregated = await AggregatedWords.getAllWords(
        //     {
        //       authUser: this.props.authUser,
        //       wordsPerPage: 4000,
        //       filter: JSON.stringify(filter),
        //     });
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
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data: count
                    },
                    // {
                    //     label: "Правильные ответы",
                    //     backgroundColor: "rgba(0, 255, 0, 0.75)",
                    //     data: [4, 15, 21, 0, 12, 4, 2]
                    // }
                ]
            }
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
                                <button>Сегодня</button>
                            </li>
                            <li className="list-inline-item">
                                <button>Статистика</button>
                            </li>
                            <li className="list-inline-item">
                                <button>Слова</button>
                            </li>
                        </ul>
                    </div>
                    {/* <GraphDays data={this.state.data} /> */}
                    <GraphWords />
                </div>
            </section>
        )
    }
}

export default StatsContainer;