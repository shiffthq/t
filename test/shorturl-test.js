const request = require('supertest')
const assert = require('power-assert')
const app = require('../app/app')

describe('shorturl', () => {
  describe('shorten', () => {
    it('should ok', function * () {
      let url = 'http://example.com'
      let res = yield request(app).post('/shorten')
        .send({
          url
        })
      assert.equal(res.statusCode, 200)
      assert.equal(res.body.url, url)

      assert.deepEqual(Object.keys(res.body), [
        'id',
        'code',
        'url',
        'created'
      ])
    })

    it('should reject', function * () {
      let res = yield request(app).post('/shorten')
        .send({
          url: ['something not string']
        })
      assert.equal(res.statusCode, 400)
      assert.equal(res.body.message, 'param `url` should be string')
    })
  })

  describe('retrieve', () => {
    it('should ok', function * () {
      let url = 'http://example.com'
      let res = yield request(app).post('/shorten')
        .send({
          url
        })
      assert.equal(res.statusCode, 200)

      let code = res.body.code
      res = yield request(app).get(`/${code}`)
      assert.equal(res.statusCode, 200)
      assert.equal(res.body.url, url)
    })

    it('should return 404 if not found', function * () {
      let res = yield request(app).get(`/notexistcode`)
      assert.equal(res.statusCode, 404)
      assert.equal(res.body.message, 'not found')
    })
  })
})
