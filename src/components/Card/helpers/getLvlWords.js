function getLvlWords(lvl) {
    switch (lvl) {
        case 'Начальный':
            return 1;
        case 'Средний':
            return 3;
        case 'Продвинутый':
            return 5;
        default:
            break;
    }
}
export default getLvlWords
