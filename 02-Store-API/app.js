require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDb = require('./db/connect')
const productsRouter = require('./routes/products')


const app = express()
const port = process.env.PORT || 5000



// async errors

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)

// products route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        // connect to database
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening at http://localhost:${port}/`))
    } catch (error) {
        console.log(error)
    }
}

start()