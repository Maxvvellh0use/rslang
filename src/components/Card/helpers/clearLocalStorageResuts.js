function clearLocalStorageResults(localStorage) {
    localStorage.page = 0;
    localStorage.corrects = 0;
    localStorage.errors = 0;
    localStorage.oldCorrects = 0;
    localStorage.showWords = 0;
    localStorage.correctSeries = 0;
    localStorage.bestSeries = 0;
}

export default clearLocalStorageResults;
