const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//creating a user schema
const userSchema = new mongoose.Schema({
      username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
      },
      email:{
        type:String,
        required:true,
        max:50,
        unique:true,
      },
      password:{
        type:String,
        required:true,
        min:6,
      },
      profilePicture:{
        type:String,
        default:'',
      },
      coverPicture:{
        type:String,
        default:'',
      },
      followers:{
        type:Array,
        default:[],
      },
      following:{
        type:Array,
        default:[],
      },
      DateOfBirth:{
        type:Date,
        // required:true,
      },
      isAdmin:{
        type:Boolean,
        default:false
      },
      pictures:{
        type:Array,
        default:[]
      },
      likes:{
        type:Array,
        default:[]
      },
      comments:{
        type:Array,
        default:[]
      }
},{timestamps:true})
//hashing password before save
userSchema.pre('save',async function(next){
  try{
  const salt =await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
}catch{
  throw Error(err.message)
}
  next()
})
//logging after succesful save
userSchema.post('save',async function(next){
  console.log('user registered successfully')
  next()
})
userSchema.statics.login = async function(email,password){
  const user = await this.findOne({email})
  if(user){
     const pass = await bcrypt.compare(password,user.password)
     if(pass){
       return user
     }
     throw Error('Password is incorrect')
  }
  throw Error('Email is not registered')
}
module.exports = mongoose.model('registered-users',userSchema)
