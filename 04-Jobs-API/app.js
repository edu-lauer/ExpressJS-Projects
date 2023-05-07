require('dotenv').config()
require('express-async-errors')
const authenticateUser = require('./middleware/authentication')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// app.use(express.static('./public'))
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1>')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



    const start = async () => {
        try {
            // connect to databased
            await connectDb(process.env.MONGO_URI)
            app.listen(port, () => {
                console.log(`Server listening at http://localhost:${port}/`)
            })
        } catch (error) {
            console.log(error)
        }
    }

start()