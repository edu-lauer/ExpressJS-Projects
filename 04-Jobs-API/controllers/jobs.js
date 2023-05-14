const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors/index')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { jobId } } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })

    // essa parte do código não roda, sempre que é tentando achar um _id não existente ele joga erro 500 e não entra nesse if
    if (!job) {
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    // const { company, position } = req.body
    // const { userId } = req.user
    // const { jobId } = req.params
    const { body: { company, position }, user: { userId }, params: { jobId } } = req


    if (!company || !position) {
        throw new BadRequestError('Company or Position fields can not be empty')
    }

    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )

    // essa parte do código não roda, sempre que é tentando achar um _id não existente ele joga erro 500 e não entra nesse ifi
    if (!job) {
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    res.status(StatusCodes.OK).json({ msg: job })
}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { jobId } } = req

    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId
    })

    // essa parte do código não roda, sempre que é tentando achar um _id não existente ele joga erro 500 e não entra nesse ifi
    if (!job) {
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    res.status(StatusCodes.OK).send()
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }