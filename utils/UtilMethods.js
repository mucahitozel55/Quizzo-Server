
exports.showError = (res, message) => {
    console.log('Error: ' + message)
    res.status(200).json({
        error: message
    })
}

exports.shuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

exports.getRandomNumber = (s, e) => {
    return Math.floor((Math.random() * e) + s);
}