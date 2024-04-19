
const productModel = require('../models/productsModel.js')

const getAllProducts = async (req, res) => {
    const data = await productModel.find();
    const { sort='price',page=1,pageSize=3,fields = "-info", ...q } = req.query;
    const sortStr = sort.split(',').join(' ');
    const fieldsStr = fields.split(',').join(' ');

    
    let query = productModel.find(q);
    query = query.sort(sortStr);

    const skip=pageSize*(page-1);
    query=query.skip(skip).limit(pageSize);
    query=query.select(fieldsStr)

    const products = await query;
    const totalResults=await productModel.countDocuments()

    res.json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
        totalResults,
        pageSize,
        page,
    });
};
const addProducts = async (req, res) => {
    try {
        const { _id, ...data } = await productModel.create(req.body)
        console.log(data)
        res.json({
            status: 'success',
            result: 1,
            data: {
                product: data,
            }
        });
    }
    catch (err) {
        res.status(403),
            res.json({
                status: 'fail',
                message: JSON.stringify(err),
            });
    }
}

const replaceProduct = async (req, res) => {
    try {
        const reqId = req.params.id;
        const data = { ...req.body, reqId };
        const result = await productModel.findOneAndReplace({ _id: reqId }, data);
        res.json({
            status: 'success',
            result: 1,
            data: {
                product: data,
            }
        });
    }
    catch (err) {
        res.status(501),
            res.json({
                status: 'fail',
                message: JSON.stringify(err),
            });
    }
}

// delete do complete
const deleteUser=async(req,res)=>{
    try{
        const reqId=req.params.id;
        const data={...req.body,reqId};
        const result =await productModel.deleteOne({_id:reqId},data);
        res.json({
            status: 'success',
            result: 1,
            data: {
                product: data,
            }
        });
    }
    catch(err){
        res.status(501),
            res.json({
                status: 'fail',
                message: JSON.stringify(err),
            });
    }
}

module.exports = {
    getAllProducts,
    addProducts,
    replaceProduct,
    deleteUser,
};