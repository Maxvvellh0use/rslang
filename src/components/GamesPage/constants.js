import SIGameImage from '../../assets/img/games/SIGame.png';
import CWGameImage from '../../assets/img/games/CWGame.jpg';
import EPGameImage from '../../assets/img/games/EPGame.jpg';
import AGameImage from '../../assets/img/games/AGame.jpg';
import SPGameImage from '../../assets/img/games/SPGame.png';
import SAGameImage from '../../assets/img/games/SAGame.jpg'

const GAMES = [
    {title: 'Speak It', description: 'Игра для тренировки произношения', id: 0, img: SIGameImage},
    {title: 'English Puzzle', description: 'Собирайте предложения из перемешанных слов', id: 1, img: EPGameImage},
    {title: 'Спринт', description: 'За отведенный промежуток времени необходимо указать принадлежат ли переводы словам', id: 2, img: SPGameImage},
    {title: 'Аудиовызов', description: 'Слушайте слово на английском и выбирайте его перевод на русском', id: 3, img: AGameImage},
    {title: 'CrossWord', description: 'Угадывайте слова по буквам исходя из заданных вопросов', id: 4, img: CWGameImage},
    {title: 'Саванна', description: 'Что-то тут явно происходит', id: 5, img: SAGameImage}
]

export default GAMES;