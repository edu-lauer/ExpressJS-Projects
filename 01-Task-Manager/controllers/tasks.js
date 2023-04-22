const Task = require('../models/TaskSchema.js')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ msg: `no task with id:${id}` })
        }
        res.status(200).send({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndUpdated(id, req.body, {
            new: true,
            runValidators: true
        })
        console.log(req.body, task.id)
        res.status(200).send({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ msg: `no task with id:${id}` })
        }
        res.status(200).send()
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}