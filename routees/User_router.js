const express = require("express");

const { Usermodel } = require("../models/User.model");
const { Doctormodel } = require("../models/Doctor.model");
const {authMiddleware}=require("../middleware/Authentication")


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Userrouter = express.Router();

Userrouter.get("/", (req, res) => {
  res.send("userrouter");
});

Userrouter.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    const Existing_user = await Usermodel.find({ email });

    if (Existing_user.length > 0) {
      res.send({
        msg: "User already registerd with this email please login",
        email,
      });
    } else if (password !== confirmpassword) {
      res.send({ reponse: "passowrd and cofirm passowrd doesnot match" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.send(err);
        } else {
          const new_user = new Usermodel({ email, password: hash });
          await new_user.save();
          res.status(200).send({ msg: "User registerd Sucessfully", new_user });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error" });
  }
});

Userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    console.log("user oruter");

    const user = await Usermodel.find({ email });

    // console.log(user)
    if (user.length) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        // result == true
        if (result) {
          var token = jwt.sign({ userID: user[0]._id }, process.env.token);

          res.send({ token, res: "Login sucessfull" });
        } else {
          res.send("Wrong credentials");
        }
      });
    } else {
      res.send("User NOt registerd");
    }
    console.log(user);
  } catch (error) {
    res.send({ msg: "login faild" });
  }
});

Userrouter.post("/onboard",authMiddleware, async (req, res) => {
  try {
    // const {}
    const { name, image, specialization, experience, location, slots, feee } =
      req.body;
    console.log(req.body);

    // const new_doctor = new Doctormodel({ name, image, specialization, experience, location, slots, feee,date });
    const new_doctor = new Doctormodel(req.body);
    await new_doctor.save();
    res.status(200).send({ msg: "Added new doctor", new_doctor });
   
  } catch (error) {}
});


Userrouter.get("/doctors",authMiddleware, async(req,res)=>{
  try {
    let doctors=await Doctormodel.find()
    res.send(doctors)
    
  } catch (error) {
    
  }
})

module.exports = {
  Userrouter,
};
