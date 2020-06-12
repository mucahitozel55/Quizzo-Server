const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const QuestionSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        category: {
            type: String,
            required: 'Category is required',
        },
        question: {
            type: String,
            required: 'Question is required'
        },
        image: {
            type: String,
            default: 'null'
        },
        answers: {
            type: [String],
            required: 'Answers are required',
            default: []
        },
        correct: {
            type: Number,
            required: 'Correct Answer index required'
        }
    },
    {
        collection: 'QUESTIONS'
    }
)

QuestionSchema.plugin(autoIncrement.plugin, { model: 'Question', field: 'id', startAt: 1 })

module.exports = mongoose.model("Question", QuestionSchema)