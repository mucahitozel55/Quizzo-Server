const Question = require('../models/QuestionModel')
const Util = require('../utils/UtilMethods')
const Entities = require('html-entities').AllHtmlEntities

const key = process.env.WRITE_KEY
const entities = new Entities()

exports.getQuestions = async (req, res) => {
    let category = req.query.category
    if (category) {
        let questions = await Question.find({ 'category': category })
            .catch(err => Util.showError(res, err.message))
        questions = Util.shuffleArray(questions)
        questions = questions.slice(0, questions.length >= 8 ? 8 : questions.length)
        res.status(200).json({
            count: questions.length,
            questions: questions
        })
    } else {
        Question.aggregate([{ $sample: { size: 8 } }], (err, docs) => {
            if (err) {
                Util.showError(res, err)
                return
            }
            res.status(200).json({
                count: docs.length,
                questions: docs
            })
        })
    }
}

exports.addQuestion = async (req, res) => {
    try {
        let keyVal = req.query.key
        if (keyVal == null || keyVal != key) {
            Util.showError(res, 'Key missing or incorrect')
            return
        }
        let question = new Question(req.body)
        await question.save()
            .catch(e => {
                Util.showError(res, e.message)
                return
            })
        res.status(200).json(
            question
        )
    } catch (e) {
        Util.showError(res, e.message)
    }
}

exports.addQuestionBatch = async (req, res) => {
    try {
        let keyVal = req.query.key
        if (keyVal == null || keyVal != key) {
            Util.showError(res, 'Key missing or incorrect')
            return
        }
        let questions = req.body.questions
        questions.forEach(q => {

            let category = q.category
            let question = entities.decode(q.question)
            let answers = []
            answers.push(entities.decode(q.correct_answer))
            q.incorrect_answers.forEach(e => answers.push(entities.decode(e)));
            answers = Util.shuffleArray(answers)
            let correct = answers.findIndex(o => o === entities.decode(q.correct_answer))

            let ques = new Question({
                category: category,
                question: question,
                answers: answers,
                correct: correct,
            })

            ques.save()
                .catch(err => {
                    Util.showError(res, err.message)
                    return
                })

        });
        res.status(200).json({
            success: questions.length + ' questions added'
        })
    } catch (err) {
        Util.showError(res, err.message)
    };
}

exports.getAllCategories = async (_, res) => {
    try {
        Question.find().distinct('category', (err, categories) => {
            if (err)
                Util.showError(res, err)
            res.status(200).json({
                categoryList: categories
            })
        })
    } catch (err) {
        Util.showError(res, err.message)
    }
}