const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String},
    location:{type:String},
    description:{type:String},
    PostImage:{type:String}
});

const user = mongoose.model("userPost",userSchema);

module.exports = user;