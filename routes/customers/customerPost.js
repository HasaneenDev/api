const {
    CustomerPost,
    customerPostValid
} = require('../../model/customers/customerPost')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customerPost = await CustomerPost
                                .find()
                                .populate('customer', 'name city phone email -_id')
                                .populate('category','name -_id');
    res.send(customerPost)
})
router.post('/', async (req, res) => {
    const { error } = customerPostValid(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    
    const customerPost = new CustomerPost({
        name: req.body.name,
        descriptions: req.body.descriptions,
        customer: req.body.customerId,
        category:req.body.categoryId,
        date: new Date().toLocaleString()
    })
    await customerPost.save();
    res.send(customerPost);
})
router.put('/:id', async (req, res) => {
    const customerPost = await CustomerPost.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        descriptions: req.body.descriptions
    }, {
        new: true
    })
    res.send(customerPost)
})

router.delete('/:id', async (req, res) => {
    const customerPost = await CustomerPost.findByIdAndDelete(req.params.id)
    res.send(customerPost)
})
router.get('/:id', async (req, res) => {
    const customerPost = await CustomerPost.findById(req.params.id).populate('customer',['name','city'])
    res.send(customerPost)
})
module.exports = router;