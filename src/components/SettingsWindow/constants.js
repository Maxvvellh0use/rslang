export const TEXT = {
    HEADING: 'Настройки',
    ENGLISH_LEVEL: 'Выберите ваш уровень английского:',
    DAILY_NUMBER: 'Укажите количество новых слов, которое вы хотите изучать ежедневно:',
    MAX_NUMBER: 'Укажите максимальное количество новых слов, которое вы хотите изучать ежедневно:',
    SUBMIT: 'Принять',
    HINTS: 'Выберите информацию, которая будет выводиться на карточках:',
}
export const NOTIFICATIONS = {
    CANNOT_BE_GREATER: { type: 'error', text: 'Ежедневное количество слов не может быть больше максимального количества слов' },
    NO_CHECKED: { type: 'error', text: 'Как минимум одна подсказка должна быть выбрана' },
    UNKNOWN: {type: 'error', text: 'Что-то пошло не так :('},
    SUCCESS: { type: 'success', text: 'Настройки изменены успешно!' },
}
export const ENGLISH_LEVELS_ARRAY = ['Начальный', 'Средний', 'Продвинутый'];
export const HINTS_ARRAY = [
    { type: 'checkbox', name: 'translation', text: 'перевод слова' },
    { type: 'checkbox', name: 'meaningSentense', text: 'предложение со значением слова' },
    { type: 'checkbox', name: 'exampleSentense', text: 'предложение с использованием слова' },
    { type: 'checkbox', name: 'autoPlay', text: 'автопроизношение слова' },
    { type: 'checkbox', name: 'image', text: 'картинка-ассоциация' },
    { type: 'checkbox', name: 'transcription', text: 'транскрипция слова' }
];
export const DEFAULT = {
    ENGLISH_LEVEL: 'Начальный',
    DAILY_NUMBER: 20,
    MAX_NUMBER: 40,
}