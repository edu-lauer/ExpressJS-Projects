require('dotenv').config()
require('express-async-errors')
const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start = async () => {
    try {
        // connectDb
        // await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()