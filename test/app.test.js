const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../index');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});