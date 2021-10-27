const Category = require('../models/categoryModel')



const categoryControl = {
    getCategories: async(req, res) =>{
        // res.json("Test category control")
        try {
            const categories = await Category.find()
            res.json(categories)
            
        } catch (err) {
           return res.status(500).json({msg: err.message});
        }
    }, 
    createCategory: async(req, res) =>{
        try {
            // role = 1 --> user
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg: 'Category already exists'})

            const newCategory = new Category({name});
            await newCategory.save();

            res.json({msg: `Created ${name} category`})

        } catch(err) {
            res.status(500).json({msg: err.message})
        }
    }, 
    deleteCategory: async(req, res) =>{
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: `Successfully deleted `})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})
            res.json({msg: `Updated category`})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryControl