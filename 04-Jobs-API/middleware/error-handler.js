const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMIddleware = async (err, req, res, next) => {

    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || 'Something went wront try again later'
    }

    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose anothe value`
        customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}


module.exports = errorHandlerMIddleware