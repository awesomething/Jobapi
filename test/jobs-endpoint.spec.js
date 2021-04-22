const { expect } = require('chai')
//const knex = require('knex')
const app = require('../index')
const { makeJobsArray } = require('./jobs.fixtures')
const config = require('../src/config');
const mysql = require("mysql");

describe('Jobs Endpoints', function () {
  
  before('make mysql instance', () => {
    database = mysql.createConnection({
      client: 'mysql',
      connection: process.env.TEST_database_URL,
    })
    app.set('database', database)
  }) 

  after('disconnect from database', () => database.destroy())

  before('clean the table', () => database('jobs').truncate())

  afterEach('cleanup', () => database('jobs').truncate())
  
  describe(`GET /employees`, () => {
    context(`Given no employees`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/employees")
          .expect(200, [])
      })
    })

    context('Given there are jobs in the database', () => {
      const testJobs = makeJobsArray()

      beforeEach('insert jobs', () => {
        return database
          .into('jobs')
          .insert(testJobs)
      })

      it('responds with 200 and all of the jobs', () => {
        return supertest(app)
          .get("/employees")
          .expect(200, testJobs)
          
      })
    })
  })

  
  describe(`POST /create`, () => {
    it(`creates a job, responding with 201 and the new job`, function () {
      const newJob = {
          company: "Amazon",
          experience: "2",
          country: "USA",
          position: "Frontend",
          wage: "300000"
      }

      const requiredFields = ['company', 'experience', 'country', 'position', 'wage']
      
      requiredFields.forEach(field => {
           const newPost = {
             company: 'Test new post',
             experience: 2,
             country: 'Test new posts',
             position: 'Test new post content',
             wage: 3
           }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newJob[field]

        return supertest(app)
          .post('/api/jobs')
          .send(newJob)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })

    return supertest(app)
      .post('/create')
      .send(newJob)
      .expect(201)
      .expect(res => {
        expect(req.body.company).to.eql(newPost.company)
        expect(req.body.experience).to.eql(newPost.experience)
        expect(res.body.country).to.eql(newPost.country)
        expect(req.body.position).to.eql(newPost.position)
        expect(req.body.wage).to.eql(newPost.wage)
        expect(res.body).to.have.property('id')
      })
      .then(postRes =>
        supertest(app)
          .get(`/employees/${postRes.body.id}`)
          .expect(postRes.body)
      )
  })
})


})
