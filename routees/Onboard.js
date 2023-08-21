const express=require("express")

// const {Doctormodel}=require("../models/Doctor.model")




const Doctorrouter=express.Router()


Doctorrouter.get("/",(req,res)=>{
    res.send("onboardign doctort")
})


module.exports={
    Doctorrouter
}