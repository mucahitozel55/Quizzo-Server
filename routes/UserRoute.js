const express = require('express')
const router = express.Router()

const controller = require('../controllers/UserController')

router.get('/user', controller.getUserByEmailorID)
router.post('/user', controller.createUser)
router.put('/user', controller.updateUser)
router.post('/user/history', controller.addHistory)
router.post('/user/historyBatch', controller.addHistoryBatch)

module.exports = router