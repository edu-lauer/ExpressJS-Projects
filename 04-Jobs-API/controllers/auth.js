const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //     throw new BadRequestError('One of the fields is missing')    
    // }

    const user = await User.create({ ...req.body })

    const token = jwt.sign({ userId: user._id, name: user.name }, 'jswtSecret', { expiresIn: '30d' })

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    res.send('login user')
}


module.exports = { register, login }