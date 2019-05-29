const _ = require('lodash')
const {
    Customer,
    customerValidation
} = require('../../model/customers/customerInfo');
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();

// get all customer 
router.get('/', async (req, res) => {
    let customers = await Customer.find();
    if (!customers) return res.status(404).send('customers are not found')
    res.send(customers)
})

// create customer
router.post('/', async (req, res) => {
    // front validation
    const {
        error
    } = customerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check email validation
    let customer = await Customer.findOne({
        email: req.body.email
    });
    // error email valid
    if (customer) return res.status(400).send('email is already registered');
    customer = await Customer(
        _.pick(req.body, ['name', 'email', 'password', 'phone', 'city'])
    );

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt)

    // save customer
    await customer.save();
    // response data
    res.send(
        _.pick(customer, ['name', 'email', 'city', 'phone'])
    );
})

// update customer 
router.put('/:id', async (req, res) => {
    const {
        error
    } = customerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        password: req.body.password
    }, {
        new: true
    })
    res.send(customer)
})
// get customer 
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer is not found')
    res.send(customer)
})
// delete customer 
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer)
})
module.exports = router;