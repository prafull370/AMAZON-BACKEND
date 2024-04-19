
const usersModel = require('../models/usersModel.js')

const getAllUsers = async (req, res) => {
    const data = await usersModel.find();
    const { sort = 'price', page = 1, pageSize = 3, fields = "-info", ...q } = req.query;
    const sortStr = sort.split(',').join(' ');
    const fieldsStr = fields.split(',').join(' ');


    let query = usersModel.find(q);
    query = query.sort(sortStr);

    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
    query = query.select(fieldsStr)

    const users = await query;
    const totalResults = await usersModel.countDocuments()

    res.json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
        totalResults,
        pageSize,
        page,
    });
};
const addUsers = async (req, res) => {
    try {
        const { _id, ...data } = await usersModel.create(req.body)
        console.log(data)
        res.json({
            status: 'success',
            result: 1,
            data: {
                users: data,
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

const replaceUsers = async (req, res) => {
    try {
        const reqId = req.params.id;
        const result = await usersModel.findOneAndReplace({ _id: reqId }, data);
        res.json({
            status: 'success',
            result: 1,
            data: {
                users: data,
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
const deleteUsers = async (req, res) => {
    try {
        const reqId = req.params.id;
        const result = await usersModel.deleteOne({ _id: reqId }, data);
        res.json({
            status: 'success',
            result: 1,
            data: {
                users: data,
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
};

module.exports = {
    getAllUsers,
    addUsers,
    replaceUsers,
    deleteUsers
};