const Joi = require('joi');
const mongoose = require('mongoose')
const customerPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        maxlength:255
    },
    descriptions:{
        type:String,
        required:true,
        maxlength:1024
    },
    date:{
        type:Date
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
})
const CustomerPost = mongoose.model('CustomerPost',customerPostSchema);
function customerPostValid(post){
    const schema = {
        name: Joi.string().required().max(255),
        descriptions:Joi.string().required().max(1024),
        customerId:Joi.required(),
        categoryId:Joi.required()
    }
    return Joi.validate(post,schema)
}
exports.CustomerPost = CustomerPost;
exports.customerPostValid= customerPostValid