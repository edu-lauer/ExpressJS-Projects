const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = authenticationMiddleware