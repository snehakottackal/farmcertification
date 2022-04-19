
const mongoose = require("mongoose");

const appliSchema = new mongoose.Schema ({
    name: String,
    emailId:String,
    address:String,
    mobile: String,
    dateofbirth: String,
    fieldid: String,
    crop_cultivating: String,
    type_of_soil:String,
    acre_of_land: String,
    years_of_experience: String

})
module.exports = mongoose.model('application', appliSchema);
