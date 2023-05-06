const express = require('express')
const router = express.Router()

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')

router.get('/getalljobs', getAllJobs)
router.get('/getjob', getJob)
router.get('/createjob', createJob)
router.get('/updatejob', updateJob)
router.get('/deletejob', deleteJob)

module.exports = router