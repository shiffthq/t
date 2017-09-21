const express = require('express')
const router = express.Router()
const shortid = require('shortid')

const Shorturl = require('../model/shorturl')

router.post('/shorten', function (req, res, next) {
  const url = req.body.url

  if (typeof url !== 'string') {
    res.status(400).json({
      message: 'param `url` should be string'
    })
    return
  }

  Shorturl.create({
    code: shortid.generate(),
    url: url
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(next)
})

router.get('/:code([0-9a-zA-Z]+)', function (req, res, next) {
  const code = req.params.code

  Shorturl.findOne({
    where: {
      code: code
    }
  })
    .then(doc => {
      if (doc) {
        res.json(doc)
      } else {
        res.status(404).json({
          message: 'not found'
        })
      }
    })
    .catch(next)
})

module.exports = router
