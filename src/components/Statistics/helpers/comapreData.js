import weekDay from '../const';

function compareData(dates, wordsData) {
    const dateAndCount = dates.map((date) => {
        const inDate = new Date(date);
        const convertToDateString = ('0' + inDate.getDate()).slice(-2) + '.'
                                    + ('0' + (inDate.getMonth()+1)).slice(-2) + ' '
                                    + weekDay[inDate.getDay()];
        const wordsCount = wordsData.filter((data) => data.timeStamp === date).length;
        return {
            day: convertToDateString,
            wordsCount: wordsCount,
        }
    })

    return dateAndCount;
}

export default compareData;