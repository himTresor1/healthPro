const express=require('express')
const router = express.Router()

const patientsController = require('../controlers/patientsController')

router.route('/')
    .delete(patientsController.deletePatient)
    .get(patientsController.getAllPatients)
    .patch(patientsController.updatePatient)
    .post(patientsController.createNewPatient)

module.exports= router

