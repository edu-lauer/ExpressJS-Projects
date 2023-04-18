const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://eduardolauer:V6fkEr1r0P49Lbkx@cluster.91zygcd.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority'

const connectDb = () => {
    return mongoose.connect(connectionString)
}

module.exports = connectDb