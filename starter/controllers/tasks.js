const Task = require('../models/TaskSchema.js')

const getAllTasks = (req, res) => {
    res.send('Get all taks')
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send({ task })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getTask = (req, res) => {
    res.send({ id: req.params.id })
}

const updateTask = (req, res) => {
    res.send({ id: req.params.id })
}

const deleteTask = (req, res) => {
    res.send({ id: req.params.id })
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}