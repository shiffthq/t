const express = require('express')
const router = express.Router()
const generate = require('nanoid/generate')

const Shorturl = require('../model/shorturl')

const generateId = () =>
  generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6)

router.post('/shorten', function (req, res, next) {
  const url = req.body.url

  if (typeof url !== 'string') {
    res.status(400).json({
      message: 'param `url` should be string'
    })
    return
  }

  Shorturl.create({
    code: generateId(),
    url: url
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(next)
})

router.get('/:code([0-9a-zA-Z_-]+)', function (req, res, next) {
  const code = req.params.code
  const inspect = req.query.inspect

  Shorturl.findOne({
    where: {
      code: code
    }
  })
    .then(doc => {
      if (doc) {
        if (inspect !== undefined) {
          res.json(doc)
        } else {
          res.redirect(doc.url)
        }
      } else {
        res.status(404).json({
          message: 'not found'
        })
      }
    })
    .catch(next)
})

module.exports = router
