const userModel = require('../models/userModel')
module.exports.registerGet = (req,res)=>{
	res.send('Its an auth route')
}
module.exports.registerPost = async(req,res)=>{
	try{
	  //creating a new user
	  const newUser = new userModel({
		username:req.body.username,
		email:req.body.email,
		password:req.body.password,
	  })
	  res.send('User registered')
	  //saving the user
	  const save = await newUser.save()
	}catch(err){
	  res.send(err.message)
	}
  }
module.exports.loginGet = (req,res)=>{
	res.send('You are in a user route')
  }
module.exports.loginPost = async (req,res)=>{
	try{
	  const {email,password} = req.body;
	  const user = await userModel.login(email,password)
	  res.json(user)
  
  }catch(err){
	console.log(err)
  }
  }