import SIGameImage from '../../assets/img/games/SIGame.png';
import CWGameImage from '../../assets/img/games/CWGame.jpg';
import EPGameImage from '../../assets/img/games/EPGame.jpg';
import AGameImage from '../../assets/img/games/AGame.jpg';
import SPGameImage from '../../assets/img/games/SPGame.png';
import SAGameImage from '../../assets/img/games/SAGame.jpg'

export const englishPuzzleLink = 'https://rslang-team32-maxvvellh0useenglish.netlify.app/'

const GAMES = [
    {title: 'Speak It', description: 'Игра для тренировки произношения', id: 0, img: SIGameImage, link: '/main/games/speak_it'},
    {title: 'English Puzzle', description: 'Собирайте предложения из перемешанных слов', id: 1, img: EPGameImage, link: englishPuzzleLink},
    {title: 'Спринт', description: 'За отведенный промежуток времени необходимо указать принадлежат ли переводы словам', id: 2, img: SPGameImage, link: '/main/games/sprint'},
    {title: 'Аудиовызов', description: 'Слушайте слово на английском и выбирайте его перевод на русском', id: 3, img: AGameImage, link: '/main/games/audio_call'},
    {title: 'CrossWord', description: 'Угадывайте слова по буквам исходя из заданных вопросов', id: 4, img: CWGameImage, link: '/main/games/cross_word'},
    {title: 'Саванна', description: 'Что-то тут явно происходит', id: 5, img: SAGameImage, link: '/main/games/savannah'}
]

export default GAMES;
