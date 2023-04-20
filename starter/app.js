require('dotenv').config()
const express = require('express')
const connectDb = require('./db/connect.js')
const tasks = require('./routes/tasks.js')
const notFound = require('./middleware/not-found.js')

const port = 5000
const app = express()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes

app.use('/api/v1/tasks', tasks)
app.use(notFound)


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get a single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task