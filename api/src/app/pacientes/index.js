const express = require('express')
const router  = express.Router()
const pacientesController = require('./pacientesController')

router.get('/pacientes', pacientesController.Listar)

router.post('/pacientes', pacientesController.novo)

router.get('/pacientes/:id', pacientesController.buscarPorId)

router.put('/pacientes/:id', pacientesController.edit)

router.delete('/pacientes/:id', pacientesController.delete)

module.exports = router
