import imageCard1 from '../../assets/img/main_page/big_ban.jpg'
import imageCard2 from '../../assets/img/main_page/LondonBridge.jpg'
import GAMES from '../GamesPage/constants'
import {motivationalMessage} from './const'
import {taskMessege} from './const'

const setGameFromDate = () => {
    let currentDate = new Date();
    if(+currentDate.getDay() === 6) return 3;
    return +currentDate.getDay();
}

const ObjectWithPhrases = {
    card1: { 
        image: imageCard1,
        task: 'Задание 1:  Пройди дневную норму слов',
        link: '',
        linkMessage: '',
        motivationalMessage: 'Отличная возможность пополнить свой слованый запас!'
    },
    card2:{
            image: GAMES[setGameFromDate()].img,
            task: 'Задание 2:  Прокачай свои знания в мини-игре',
            link: GAMES[setGameFromDate()].link,
            linkMessage: GAMES[setGameFromDate()].title,
            motivationalMessage: motivationalMessage[setGameFromDate()]
    },
} 

export default ObjectWithPhrases;