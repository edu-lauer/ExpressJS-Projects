const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const playload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: playload.userId, name: playload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth