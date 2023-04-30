require('dotenv').config()
require('express-async-errors')
const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('<h1>JasonWebToken</h1>')
})

const start = () => {
    app.listen(port, () => {
        try {
            // connectDb
            connectDb(process.env.MONGO_URI)
            console.log(`Server is listening at http://localhost:${port}/`)
        } catch (error) {
            console.log(error)
        }
    })
}

start()