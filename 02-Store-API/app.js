require('dotenv').config()
const express = require('express')
const connectDb = require('./db/connect')

const app = express()
const port = process.env.PORT || 5000



// async errors

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

// products route
// app.use(notFoundMiddleware)
// app.use(errorMiddleware)


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening at http://localhost:${port}/`))
    } catch (error) {
        console.log(error)
    }
}

start()