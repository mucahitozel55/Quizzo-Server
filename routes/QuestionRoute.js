const express = require('express')
const router = express.Router()

const controller = require('../controllers/QuestionController')

router.get('/question', controller.getQuestions)
router.get('/question/categories', controller.getAllCategories)
router.post('/question', controller.addQuestion)
router.post('/question/batch', controller.addQuestionBatch)

module.exports = router