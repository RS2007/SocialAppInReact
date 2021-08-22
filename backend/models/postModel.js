const mongoose = require('mongoose')
const {Schema} = mongoose
const {model} = mongoose

const postModel = new Schema({
userId:{
	type:String,
	requird:true
},
image:{
	type:String,
	default:''
},
desc:{
	type:String,
	max:[500,'You have exceeded 500 words']
},
likes:{
	type:Array,
	default:true,
}
},{timestamps:true})

module.exports = model('user-posts',postModel)