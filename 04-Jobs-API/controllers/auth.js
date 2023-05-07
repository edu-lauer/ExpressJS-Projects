const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
    // const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //     throw new BadRequestError('One of the fields is missing')    
    // }

    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })
    
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    console.log(isPasswordCorrect)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password')
    }
    
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}


module.exports = { register, login }