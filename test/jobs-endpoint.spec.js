const { expect } = require('chai')
//const knex = require('knex')
const app = require('../app')
const { makeJobsArray } = require('./jobs.fixtures')
const config = require('../src/config');
const mysql = require("mysql");
const supertest = require('supertest');


// Arrange

describe('Employees Endpoints', function () {
  let db
  before('make knex instance', () => {
    db = mysql.createConnection({
      user: "b9bdca4b0b9ce1",
      host: "us-cdbr-east-03.cleardb.com",
      password: "9e85f6ec",
      database: "heroku_2793bc343638f0e"
    });

    app.set('db', db)
  })

  after('disconnect from database', () => db.destroy())

  before('clean the table', () => db.query('truncate jobs'))

  afterEach('cleanup', () => db.query('truncate jobs'))



  describe(`GET /employees`, () => {
    context(`Given no employees`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/employees")
          .expect(200, [])
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
            .post('/employees')
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
        .then(postRes =>
          supertest(app)
            .get(`/employees/${postRes.body.id}`)
            .expect(postRes.body)
        )
    })
  })

})