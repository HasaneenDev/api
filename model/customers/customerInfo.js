const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 25,
    },
    email:{
        type:String,
        required:true,
        // unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    },
    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:50
    },
    city:{
        type:String,
        required:true,
        maxlength:255
    }
});


const Customer = mongoose.model('Customer',customerSchema);

function customerValidtion(customer){
    const schema = {
        name:Joi.string().required().min(3).max(50),
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(8).max(1024),
        phone:Joi.string().required().min(11).max(50),
        city:Joi.string().required().max(255)
    }
    return Joi.validate(customer,schema)
}

exports.Customer = Customer;
exports.customerValidation = customerValidtion;
exports.customerSchema = customerSchema;