function getLastWeek() {
    let lastWeek = [];
    let i = 1;
    const dayBefore = new Date().setDate(new Date().getDate() - 7);
    const beginnigDayBefore = new Date(dayBefore).setHours(0, 0, 0, 0);
    while ( i <= 7) {
        let day = beginnigDayBefore;
        const nextDay = new Date(day).setDate(new Date(day).getDate() + i);
        lastWeek.push(nextDay);
        day = nextDay;
        i++;
    }
    return lastWeek;
}

export default getLastWeek;