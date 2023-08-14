const model = require('../Model/user')
const mongoose = require('mongoose');
const User = model.User;
// const jwt  = require("jsonwebtoken");





// exports.createUser = async (req, res) => {
//     try {
    // const newUser = new User(req.body);
        
//       var token = jwt.sign({ email:req.body.email },process.env.SECRET);
//       newUser.token = token;
//       console.log(req.body);
  
//       const savedUser = await newUser.save();
//       console.log('User created:', savedUser);
      
//       res.status(201).json(savedUser);
//     } catch (error) {
//     //   console.error(error);
//       res.status(500).json({ error: 'Error creating User' });
//     }
//   };
  


exports.getAllUsers = async (req, res) => {

    const users = await User.find();
    res.json(users);
  };
  
  
  exports.getUser = async (req, res) => {
    const id = req.params.id;
    // console.log({id})
    const user = await User.findById(id);
    res.json(user);
  };
  exports.replaceUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(err){
    //   console.log(err);
      res.status(400).json(err);
    }
  };
  exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(err){
    //   console.log(err);
      res.status(400).json(err);
    }
  };
  exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
    const doc = await User.findOneAndDelete({_id:id})
    res.status(201).json(doc);
    }
    catch(err){
    //   console.log(err);
      res.status(400).json(err);
    }
  };