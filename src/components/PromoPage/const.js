import cardImage from '../../assets/img/screenshots/sceenshots_card.png';
import gamesImage from '../../assets/img/screenshots/sceenshots_games.png';
import dictionaryImage from '../../assets/img/screenshots/screenshots_dictionary.png';
import settingsImage from '../../assets/img/screenshots/screenshots_settings.png';
import statisticsImage from '../../assets/img/screenshots/screenshots_statistics.png';

const cardBlock = {
    image: cardImage,
    description: 'Возможность изучения новых слов по специальным карточкам с подсказками.',
}
const gamesBlock = {
    image: gamesImage,
    description: 'Разнообразная игровая форма обучения. Скучно не будет!',
}
const dictionaryBlock = {
    image: dictionaryImage,
    description: `Сохранение пройденных слов в специальный "Словарь", возможность удаления слов из изучения и добавления
        их в категорию "Сложные"`,
}
const settingsBlock= {
    image: settingsImage,
    description: `Возможность скрытия и показа подсказок на карточках с новыми словами, настройка изучения максимального
        и минимального количества новых слов`,

}
const statisticsBlock = {
    image: statisticsImage,
    description: 'Ведение долгосрочной статистики прогресса обучения.',
}

export const sectionsApplication = [cardBlock, gamesBlock, dictionaryBlock, settingsBlock, statisticsBlock]
