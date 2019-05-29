const customer = require('./routes/customers/customerInfo')
const customerPost = require('./routes/customers/customerPost')
const mainCategory = require('./routes/customers/mainCategories')
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/telabat')
    .then(() => {
        console.log("Connected")
    })
    .catch(() => {
        console.error("error connect")
    })

app.use(express.json());
app.use('/api/customer', customer);
app.use('/api/customerPost',customerPost);
app.use('/api/mainCategories',mainCategory)

app.listen(3000, (req, res) => {
    console.log('success');

})