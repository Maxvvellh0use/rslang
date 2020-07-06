function getLvlWords(lvl) {
    if (lvl === 'Начальный') {
        return 1
    }
    else if (lvl === 'Средний') {
        return 3
    }
    else if (lvl === 'Продвинутый') {
        return 5
    }
}
export default getLvlWords
