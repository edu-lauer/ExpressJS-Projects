require('dotenv')
require('express-async-errors')

const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(notFoundMiddleware.js)
app.use(errorHandlerMiddleware.js)

// middleware
app.use(express.static('./public'))
app.use(express.json())



const start = async () => {
    try {
        // connectDb
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()