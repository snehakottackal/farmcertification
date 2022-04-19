const mongoose = require("mongoose");
var regSchema = new mongoose.Schema ({
    name : String,
    user_id : String,
    mobile : String,
    password : String
})
module.exports = mongoose.model('register', regSchema);
