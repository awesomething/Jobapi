const express = require('express')
const JobsService = require('./jobs-service')

const jobsRouter = express.Router()

jobsRouter
  .route('/')
  .get((req, res, next) => {
    JobsService.getAllJobs(req.app.get('db'))
      .then(jobs => {
        res.json(jobs.map(JobsService.serializeJob))
      })
      .catch(next)
  })

jobsRouter
  .route('/employee_id')
  .all(checkJobExists)
  .get((req, res) => {
    res.json(JobsService.serializeJob(res.job))
  
  .then(posts => {
    res.json(posts.map(JobsService.serializeJobPost))
  })
  .catch(next)
})

async function checkJobExists(req, res, next) {
  try {
    const job = await JobsService.getById(
      req.app.get('db'),
      req.params.employee_id
    )

    if (!job)
      return res.status(404).json({
        error: `Job doesn't exist`
      })

    res.job = job
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = jobsRouter 