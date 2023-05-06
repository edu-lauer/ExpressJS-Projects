const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/index')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //     throw new BadRequestError('One of the fields is missing')    
    // }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const tempUser = {
        name: name,
        email: email,
        password: hashedPassword
    }

    const user = await User.create({ ...tempUser })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('login user')
}


module.exports = { register, login }