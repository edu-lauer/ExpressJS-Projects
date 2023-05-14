require('dotenv').config()
require('express-async-errors')
const authenticateUser = require('./middleware/authentication')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')


const connectDb = require('./db/connect')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// app.use(express.static('./public'))
app.set('trust proxy', 1)
app.use(rateLimit({
    windowsMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


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