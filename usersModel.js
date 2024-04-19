const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    userName:String,
    email:String,
    userId:Number,
    image:String
})


const usersModel = mongoose.model("Users", usersSchema);
module.exports = usersModel;