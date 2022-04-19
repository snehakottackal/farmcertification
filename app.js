const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const register = require("./models/register");
const application = require("./models/application");



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('/public'));
mongoose.connect("mongodb+srv://sneha:sneha1234@cluster0.mvttd.mongodb.net/farm?retryWrites=true&w=majority", {useNewUrlParser: true
}, {
    useUnifiedTopology: true
})
//create a data schema
const loginSchema = {
    user_id: String,
    password: String
}
//create model
const login = mongoose.model("login", loginSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/");
})

app.post("/", function (req, res) {
    let newlogin = new login({
        user_id: req.body.user_id,
        password: req.body.password
    })
    newlogin.save();
    res.sendFile(__dirname + "/home.html");
})
app.get("/viewregisterform", (req, res) => {
    res.sendFile(__dirname + "/register.html");
})

app.post("/register", function (req, res) {
    console.log("data getting")
    console.log(req.body)
    let newregi = new register({
        name: req.body.name,
        user_id: req.body.user_id,
        mobile: req.body.mobile,
        password: req.body.mobile
    })
    newregi.save();
    res.sendFile(__dirname + "/home.html");
})

app.post('/', (req, res) => {
    register.find(req.body)
        .then((response) => {
            if (response.status == "ok") {
                console.log(response);
                res.sendFile(__dirname + "/home.html");
            }
            console.log("No user found");

        })
})





app.get("/applicationform", function (req, res) {
    res.render('applicationuser');
})


app.post("/applicationform", function (req, res) {
    console.log("data getting")
    console.log(req.body)
    let newappli = new application({
        name: req.body.name,
        emailId: req.body.user_id,
        address:req.body.address,
        mobile: req.body.mobile,
        dateofbirth:req.body.dateofbirth,
        fieldid: req.body.field_id,
        crop_cultivating: req.body.crop,
        type_of_soil:req.body.soil,
        acre_of_land: req.body.area,
        years_of_experience: req.body.years

    })
    newappli.save();
    res.sendFile(__dirname + "/home.html");

})
app.get("/viewapplicationform", function (req, res) {
    res.render('update');
})
app.post("/viewapplicationform", function (req, res) {
    console.log("data getting")
    console.log(req.body)
    let newappli = new application({
        name: req.body.name,
        emailId: req.body.user_id,
        address:req.body.address,
        mobile: req.body.mobile,
        fieldid: req.body.field_id,
        crop_cultivating: req.body.crop,
        type_of_soil:req.body.soil,
        acre_of_land: req.body.area,
        years_of_experience: req.body.years

    })
    newappli.save();
    res.sendFile(__dirname + "/home.html");

})

app.get("/details", (req, res) => {
    application.find({}, function (err, reg_data) {
        console.log("Values get")
        console.log(reg_data)
        res.render('details', {
            Details: reg_data
        })
    })

})



app.get('/del/:id', (req, res) => {
    var id = req.params.id;
    application.deleteOne({
            _id: mongoose.Types.ObjectId(id)
        })
        .then(result => console.log(`Deteled ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error:${err}`));
    res.redirect("/details");
})


app.get('/update/:id', (req, res) => {
    var id = req.params.id;
    application.find({
        _id: mongoose.Types.ObjectId(id)
    }, function (err, reg_data) {
        res.render('update', {
            Details: reg_data
        })
    })
})


app.post('/update1/:id', (req, res) => {
    var id = req.params.id;
    var myquery = {
        _id: mongoose.Types.ObjectId(id)
    };
    var newValues = {
        $set: {
            name: req.body.name,
            emailId: req.body.user_id,
            mobile: req.body.mobile,
            fieldid: req.body.field_id,
            crop_cultivating: req.body.crop,
            acre_of_land: req.body.area,
            years_of_experience: req.body.years

        }
    };
    application.updateOne(myquery, newValues)
        .then(result => console.log(`Updated`))
        .catch(err => console.error(`Error`));
    res.redirect("/details");

})



app.listen(3000, function () {
    console.log("server is running on 3000");
})