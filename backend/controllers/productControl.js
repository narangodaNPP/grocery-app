const Products = require('../models/productModel')

//filtering, sorting and paginations
class featuresAPI {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObject = {...this.queryString}

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObject[el]))

        let queryStr = JSON.stringify(queryObject)
        queryStr = queryStr.replace(/\b(ge|g|l|le|regex)\b/g, match => '$' + match);

        // ge = greater than or equal 
        // g = greater than
        // l = less than
        // le = less than or equal
        this.query.find(JSON.parse(queryStr))

        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query =  this.query.sort(sortBy)
        }else{
            this.query =  this.query.sort('-createdAt')
        }

        return this
    }
    pagination(){
        const page = this.queryString.page * 1||1
        const limit = this.queryString.limit * 1||10
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        
        return this;
    }
}



const productControl = {
    getProduct: async(req, res) =>{
        try{
            console.log(req.query)
            const features = new featuresAPI(Products.find(), req.query).filtering().sorting().pagination()
            const products = await features.query
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    }, 
    createProduct: async(req, res) =>{
        try{
            
            const {product_id, title, price, images, category} = req.body
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg: "Product already exists"})

            const newProduct = new Products({product_id, title, price, images, category})
            
            await newProduct.save();
            res.json({msg: `${title} created successfully`});

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteProduct: async(req, res) =>{
        try{
            await Products.findByIdAndDelete(req.params.id);
            res.json({msg: "Successfully deleted product!"});

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    }, 
    updateProduct: async(req, res) =>{
        try{
            const {title, price, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            await Products.findByIdAndUpdate({_id: req.params.id}, {title, price, images, category})
            res.json({msg: "Product updated successfully"})
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = productControl