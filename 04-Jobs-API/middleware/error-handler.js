const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMIddleware = async (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}


module.exports = errorHandlerMIddleware