const express=require("express")
require("dotenv").config()

const cors=require("cors")

const {connection}=require("./config/db")

// routerss
const {Userrouter}=require("./routees/User_router")

const {Doctorrouter}=require("./routees/Onboard")

const app=express()
app.use(cors())

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/users", Userrouter)
app.use("/doctors", Doctorrouter)


console.log(process.env.port)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server runnidng in port "+ process.env.port)
        console.log("connected to data base")
    } catch (error) {
        console.log(error)
    }
})




// [
// 	{
// 	  "name": "Jane Doe",
// 	  "image": "https://example.com/doctor-image.jpg",
// 	  "specialization": "Dermatologist",
// 	  "experience": 10,
// 	  "location": "Los Angeles",
// 	  "date": "2023-04-05T12:00:00.000Z",
// 		"slots" : 2,
// 	  "fee": 150
// 	},
// 	{
// 	  "name": "Mark Johnson",
// 	  "image": "https://example.com/doctor-image.jpg",
// 	  "specialization": "Pediatrician",
// 	  "experience": 5,
// 	  "location": "Chicago",
// 	  "date": "2023-04-06T09:30:00.000Z",
// 		"slots" : 1,
// 	  "fee": 100
// 	}
// ]