const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    }
})

const Category = mongoose.model('Category',categorySchema)

exports.Category = Category;