const jwt = require("jsonwebtoken");
const model = require("../Model/user");
const bcrypt = require("bcrypt");
// const mongoose = require('mongoose');
const User = model.User;
const fs = require("fs");
const privateKey = fs.readFileSync("./private.key", "utf-8");


//singup
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    // console.log(privateKey)
    //   var token = jwt.sign({ email:req.body.email },process.env.SECRET);
    var token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
    //where 10 is salt rounde from it number more make the it slow the server runing
    const hash = bcrypt.hashSync(req.body.password, 10);
    newUser.token = token;
    newUser.password = hash;
    console.log(req.body);

    const savedUser = await newUser.save();
    console.log("User created:", savedUser);

    res.status(201).json(savedUser);
  } catch (error) {
    //   console.error(error);
    res
      .status(500)
      .json({ error: "Error creating User", details: error.message }); // Include error details in the response
  }
};

exports.login = async (req, res) => {
  try {
    //find user from mail
    const doc = await User.findOne({ email: req.body.email });
    //it give true or false
    //compare the password one from body and from doc which we find from email
    const isAuth = bcrypt.compareSync(req.body.password, doc.password );
    //if it true again generate token
    if(isAuth){
        console.log(isAuth)
        var token = jwt.sign({ email: req.body.email }, privateKey, {
            algorithm: "RS256",
          });
          doc.token = token 
          const savedUser = await doc.save();
             console.log("User created:", savedUser);
        res.json({token})
    }
  } catch (error) {
    res.status(401).json(error.details)
    //   console.error(error);
    res
      .status(500)
      .json({ error: "Error creating User", details: error.message }); // Include error details in the response
  }
};
