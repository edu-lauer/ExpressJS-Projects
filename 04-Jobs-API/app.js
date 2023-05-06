require('dotenv')
require('express-async-errors')

const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// app.use(express.static('./public'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('jobs api')
})


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