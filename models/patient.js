const mongoose= require('mongoose')

const patientSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    heartRate:[{
        type: String,
        default: "Employee"
    }],
    blood_pressure:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: new Date()
    },
    temperature:{
        type: Number,
        required: true
    },
   patient_NID:{
        type: String,
        required: true
    },
    frequent_sickness:[{
        type: String,
        required: false

    }]
})

module.exports= mongoose.model('patient',patientSchema)