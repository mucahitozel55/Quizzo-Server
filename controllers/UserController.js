const User = require('../models/UserModel')
const Util = require('../utils/UtilMethods')

const key = process.env.WRITE_KEY

exports.createUser = async (req, res) => {
    try {
        let keyVal = req.query.key
        if (keyVal == null || keyVal != key) {
            Util.showError(res, 'Key missing or incorrect')
            return
        }
        const findUser = await User.findOne({ email: req.body.email })
        if (findUser) {
            res.status(200).json({
                user: findUser
            })
        } else {
            const user = new User(req.body)
            await user.save()
                .catch(_ => {
                    Util.showError(res, 'Cannot create user')
                })
            res.status(200).json({
                user
            })
        }
    } catch (err) {
        Util.showError(res, err.message)
    }
}

exports.updateUser = async (req, res) => {

    let keyVal = req.query.key
    if (keyVal == null || keyVal != key) {
        Util.showError(res, 'Key missing or incorrect')
        return
    }

    let query
    if (req.query.email)
        query = { email: req.query.email }
    else if (req.query.id)
        query = { id: req.query.id }

    if (query) {
        const user = await User.findOne(query)
            .catch(err => {
                Util.showError(res, err.message)
            })
        if (user) {
            if (req.body.imageURL)
                user.imageURL = req.body.imageURL
            await user.save()
                .catch(err => {
                    Util.showError(res, err.message)
                })
            res.status(200).json({
                msg: 'user updated'
            })
        } else {
            Util.showError(res, 'user not found')
        }
    }
    else {
        Util.showError(res, "query required")
    }
}

exports.getUserByEmailorID = async (req, res) => {

    let keyVal = req.query.key
    if (keyVal == null || keyVal != key) {
        Util.showError(res, 'Key missing or incorrect')
        return
    }

    let query
    if (req.query.email)
        query = { email: req.query.email }
    else if (req.query.id)
        query = { id: req.query.id }

    if (query) {
        const user = await User.findOne(query)
            .catch(err => {
                Util.showError(res, err.message)
            })
        if (user) {
            res.status(200).json({
                user
            })
        } else {
            Util.showError(res, 'user not found')
        }
    }
    else {
        Util.showError(res, "query required")
    }
}

exports.addHistory = async (req, res) => {

    let keyVal = req.query.key
    if (keyVal == null || keyVal != key) {
        Util.showError(res, 'Key missing or incorrect')
        return
    }

    let query
    if (req.query.email)
        query = { email: req.query.email }
    else if (req.query.id)
        query = { id: req.query.id }

    try {
        if (query) {
            const user = await User.findOne(query)
                .catch(err => {
                    Util.showError(res, err.message)
                })
            if (user) {
                user.history.push(req.body)
                await user.save()
                    .catch(err => {
                        Util.showError(res, err.message)
                    })
                res.status(200).json({
                    msg: 'History updated'
                })

            } else {
                Util.showError(res, 'user not found')
            }
        }
        else {
            Util.showError(res, "query required")
        }
    } catch (err) {
        Util.showError(res, err.message)
    }
}

exports.addHistoryBatch = async (req, res) => {

    let keyVal = req.query.key
    if (keyVal == null || keyVal != key) {
        Util.showError(res, 'Key missing or incorrect')
        return
    }

    let query
    if (req.query.email)
        query = { email: req.query.email }
    else if (req.query.id)
        query = { id: req.query.id }

    try {
        if (query) {
            const user = await User.findOne(query)
                .catch(err => {
                    Util.showError(res, err.message)
                })
            if (user) {
                user.history = req.body
                await user.save()
                    .catch(err => {
                        Util.showError(res, err.message)
                    })
                res.status(200).json({
                    mesg: 'History updated'
                })

            } else {
                Util.showError(res, 'user not found')
            }
        }
        else {
            Util.showError(res, "query required")
        }
    } catch (err) {
        Util.showError(res, err.message)
    }
}