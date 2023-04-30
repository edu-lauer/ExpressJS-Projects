const errorHandlerMIddleware = async (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ msg: 'Somenthing went wrong, please try again' })
}


module.exports = errorHandlerMIddleware