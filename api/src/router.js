const express = require('express')
const router = require('express').Router()

router.use('/', require('./app/pacientes/index'))

module.exports = router