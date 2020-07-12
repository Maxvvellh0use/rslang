const collectData = () => {
    const data = new Date();
    // const milisec = data.getTime();
    const milisec = 1594245599999
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);
    let inThisDay = null;
    if (milisec >= startOfDay && milisec < endOfDay) {
        inThisDay = true;
    } else inThisDay = false;

    console.log(`Data: ${data}, Milisec: ${milisec}, Start: ${startOfDay}, End: ${endOfDay}, inThisDay: ${inThisDay}`);
}

export default collectData;