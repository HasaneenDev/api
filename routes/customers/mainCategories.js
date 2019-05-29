const { Category } = require('../../model/customers/mainCaegories')
const express = require('express')
const router = express.Router();

router.get('/',async(req,res)=>{
    const categories = await Category.find();
    res.send(categories)
})
router.post('/',async(req,res)=>{
    const category = new Category({
        name: req.body.name
    })
    await category.save();
    res.send(category)
})
router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name
    },{new:true})
    res.send(category)

})
router.delete('/:id',async(req,res)=>{
    const category = await Category.findByIdAndDelete(req.params.id);
    res.send(category)
})
router.get('/:id',async(req,res)=>{
    const category = await Category.findById(req.params.id);
    res.send(category)
})
module.exports = router;