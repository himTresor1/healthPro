const express=require('express')
const router = express.Router()
const path= require('path')

router.get('^/$|/dashboard?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','patientsDashboard.html'))
})
module.exports = router
