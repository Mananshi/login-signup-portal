const router = require('express').Router();
const { check } = require('./user.controllers');

router.get('/', check)

module.exports = router;