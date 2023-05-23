const Product = require('../models/ProductModel');
const { error, success } = require('../utils/responseWrapper');
const validateMongoDbId = require('../utils/validateMongodbId');
const slugify = require('slugify');

const createProduct = async (req, res) => {
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        return res.send(success(201, newProduct));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const updateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id, 
            req.body
        ,{
            new: true,
        });

        res.send(success(201, updateProduct));

    }catch(e){
        res.send(error(500,e.message));
    }
}

const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.send(success(201, "Product deleted successfully"));
    }catch(e){
        res.send(error(500,e.message));
    }
}

const getProduct = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const findProduct = await Product.findById(id);
        if(!findProduct){
            return res.send(error(409, 'No product found'));
        }

        return res.send(success(201, findProduct));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const getAllProduct = async (req, res) => {
    try{
        const getallProduct = await Product.find();
        if(!getallProduct){
            return res.send(error(409, 'No product found'));
        }

        return res.send(success(201, getallProduct));

    }catch(e){
        return res.send(error(500,e.message));
    }
}
  
module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
}