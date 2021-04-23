
const xss = require('xss')

const JobsService = {
  getAllJobs(db) {
    return db
      .from('jobstar_jobs AS val')
      .select(
        'val.id',
        'val.company',
        'val.experience',
        'val.country',
        'val.position',
        'val.wage',
      )
      .groupBy('val.id')
    },

    getById(db, id) {
      return JobsService.getAllJobs(db)
        .where('val.id', id)
        .first()
    },
    serializeJob(job) {
      
        return {
          id: job.id,
          company: job.company,
          experience: xss(job.experience),
          country: xss(job.country),
          position: xss(job.position),
          amount_of_wages: Number(job.amount_of_wages) || 0,
          
        }
      }, 
}
module.exports = JobsService