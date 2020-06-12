const UtilMethods = require('./utils/UtilMethods')
const Question = require('./models/QuestionModel')
const { v4: uuidv4 } = require('uuid');


exports.initSockets = (http) => {
    const io = require('socket.io')(http)
    const matchQueue = []
    const matchComplete = {}

    console.log("Match Queue Length: ", matchQueue.length.toString(), '\n')

    //* MatchMaking
    io.of("matchmaking").on('connection', socket => {

        socket.on('findMatch', data => {
            try {
                if (matchQueue.length === 0) {
                    socket.uid = data.uid
                    socket.name = data.name
                    socket.imageURL = data.imageURL

                    matchQueue.push(socket)
                    console.log(socket.name, " added to matchQueue")
                } else {
                    const player1 = matchQueue.shift()
                    const matchID = uuidv4()

                    //Get questions from DB
                    Question.aggregate([{ $sample: { size: 8 } }], (err, docs) => {
                        if (!err) {
                            const match = {
                                matchID: matchID,
                                questions: docs,
                                player1: {
                                    name: player1.name,
                                    uid: player1.uid,
                                    imageURL: player1.imageURL,
                                    score: -1
                                },
                                player2: {
                                    name: data.name,
                                    uid: data.uid,
                                    imageURL: data.imageURL,
                                    score: -1
                                }
                            }

                            socket.to(player1.id).emit('matchFound', match)
                            socket.emit('matchFound', match)

                            console.log("Matched: ", player1.name, data.name, "\nQuestions: ", docs.length.toString())
                            console.log("Match Queue Length: ", matchQueue.length.toString(), '\n')
                        }
                    })


                }
            } catch (e) {
                console.log("Error in findMatch ", e.message)
            }
        })

        socket.on('findMatchBot', _ => {
            try {
                if (matchQueue.length > 0) {
                    const index = matchQueue.findIndex(e => e.id === socket.id)
                    if (index !== -1) {
                        const player1 = matchQueue.splice(index, 1)[0]

                        //Get questions from DB
                        Question.aggregate([{ $sample: { size: 8 } }], (err, docs) => {
                            if (!err) {
                                const matchID = uuidv4()
                                const match = {
                                    matchID: matchID,
                                    questions: docs,
                                    player1: {
                                        name: player1.name,
                                        uid: player1.uid,
                                        imageURL: player1.imageURL,
                                        score: -1
                                    },
                                    player2: {
                                        name: "Captain Marvel",
                                        uid: "BOT_UID",
                                        imageURL: 'https://firebasestorage.googleapis.com/v0/b/quizzo-59c8d.appspot.com/o/Bot%20Images%2FBrie-Larson---Captain-Marvel.jpg?alt=media&token=53329d15-5b74-441f-a5f0-2c9fa0bb7f19',
                                        score: UtilMethods.getRandomNumber(0, 8),
                                    }
                                }
                                socket.emit('matchFound', match)

                                console.log("Matched: ", player1.name, 'Captain Marvel', "\nQuestions: ", docs.length.toString())
                                console.log("Match Queue Length: ", matchQueue.length.toString(), '\n')
                            }
                        })
                    }
                }
            } catch (e) {
                console.log("Error in findMatchBot ", e.message)
            }
        })

        socket.on('disconnect', _ => {
            if (matchQueue.length > 0) {
                const index = matchQueue.findIndex(e => e.id === socket.id)
                if (index !== -1)
                    matchQueue.splice(index, 1)
                console.log(socket.name, ' left matchmaking')
                console.log("Match Queue Length: ", matchQueue.length.toString(), '\n')
            }
        })
    })

    //* Match
    io.of("match").on('connection', socket => {

        socket.join(socket.handshake.query.matchID)

        socket.on('complete', data => {
            try {

                const matchID = data.matchID

                if (matchComplete[matchID] && matchComplete[matchID].player1 !== data.uid) {
                    const match = matchComplete[matchID]
                    delete matchComplete[matchID]
                    match.player2 = data.uid
                    match.score2 = data.score

                    socket.to(matchID).emit('matchComplete', match)
                    socket.emit('matchComplete', match)

                    console.log("MatchCompleteSent", match)
                }else{
                    matchComplete[matchID] = {
                        player1: data.uid,
                        score1: data.score
                    }
                    console.log("MatchComplete: ", matchComplete[matchID])
                }


            } catch (e) {
                console.log("Error in Match ", e.message)
            }
        })

        socket.on('disconnect', _ => {
            socket.leave(socket.handshake.query.matchID)
        })

    })
}