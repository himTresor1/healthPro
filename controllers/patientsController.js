const Patient= require('../models/patient')

const asyncHandler= require('express-async-handler')
const getAllPatients= asyncHandler(async(req,res) =>{
    const patients= await Patient.find().lean()
    if(!patients?.length){
        return res.status(400).json({message: "No Patients found"})
    }
    res.json(patients)
})


//@desc Get all users
//@@route GET /users
//@acccess private

const createNewPatient= asyncHandler( async(req,res) =>{
    const {username,patient_NID,blood_pressure,date,heartRate,temperature,frequent_sickness} = req.body
    //confirm data
    if(!username || !patient_NID ||!blood_pressure  ||!temperature || !Array.isArray(heartRate) || !heartRate.length){
        return res.status(400).json({messsage:'All fields are required'})
    }
    //check for duplicates
    const duplicate = await Patient.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(409).json({message:'Patient already taken'})
    }
    
    const patientObject= {username,patient_NID,blood_pressure,heartRate,temperature,frequent_sickness,date}

    //Create and store new user

    const patient = await Patient.create(patientObject)

    if(patient){
        res.status(201).json({message:`New patient ${username} created`})
    }else{
        res.status(400).json({message: 'Invalid patient data received'})
    }

})

//@desc Get all users
//@@route GET /users
//@acccess private

const updatePatient= asyncHandler( async(req,res) =>{
    const {id,frequent_sickness,username,blood_pressure,heartRate,temperature} = req.body

    //confirm data
    if(!id || !username || !blood_pressure || !Array.isArray(heartRate) || !heartRate.length ){
        return res.status(400).json({message:'All fields are required'})
    }
    const patient = await Patient.findById(id).exec()
    if(!patient){
        return res.status(400).json({message:'Patient not found'})
    }

    //check for duplicate
    const duplicate= await Patient.findOne({username}).lean().exec()
    //Allow updates to original user
    if(duplicate && duplicate?._id.toString() !==id){
        return res.status(409).json({message:'Duplicate username'})
    }
    patient.username= username
    patient.heartRate= heartRate
    patient.blood_pressure= blood_pressure
    patient.frequent_sickness= frequent_sickness
    patient.temperature= temperature

    

    const updatedPatient= await patient.save()

    res.json({message:`${updatedPatient.username} updated`})
})

//@desc Get all users
//@@route GET /users
//@acccess private

const deletePatient= asyncHandler( async(req,res) =>{
    const {id} = req.body
    if(!id){
        return res.status(400).json({message:'Patient ID Required'})
    }
    
    

    const patient = await Patient.findById(id).exec()

    if(!patient){
        return res.status(400).json({message: 'Patient not found'})
    }
    const result = await patient.deleteOne()
    const reply = `username ${result.username} with ID ${result._id} deleted`
    res.json(reply)
})


module.exports={
    getAllPatients,
    createNewPatient,
    updatePatient,
    deletePatient
}