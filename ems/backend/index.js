const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded())
app.use(Cors())
const pkg = require('mongodb');

const { MongoClient } = pkg;
var url = "mongodb+srv://shubham_shay:shubham@cluster0.dlgr8.mongodb.net/demodatabase?retryWrites=true&w=majority";
mongoose.connect("mongodb+srv://shubham_shay:shubham@cluster0.dlgr8.mongodb.net/demodatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const empSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    selectdesignation: String,
    emailid: String,
    checkin: String,
    notes: String,
    notess: String,
})
const User = new mongoose.model("User", userSchema)
const Emp = new mongoose.model("Emp", empSchema)
//Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})
app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
})
app.post('/addEmployee', (req, res) => {
    //Naming convention like first word in small letters and second continued word with first letter caps and then in small letters
    const { firstname, lastname, selectdesignation, emailid, notes } = req.body
    //remove console
    console.log(req.body);
    Emp.findOne({ emailid: emailid }, (err, user) => {

        if (user) {
            res.send({ message: "Email already registerd" })
        } else {
            const user = new Emp({
                firstname,
                lastname,
                selectdesignation,
                emailid,
                notes,
            })
            user.save([{ firstname, lastname, selectdesignation, emailid, notes }], (err, data) => {
                res.send(('saved to db: ' + data));
            })
        }
    })
});
app.listen(9001, () => {
    console.log("BE started at port 9001")
})
app.put('/checkIn', async (req, res) => {
    //remove console
    console.log("sdff", req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("demodatabase");
        var myquery = { emailid: req.body.Email };
        var newvalues = { $set: { notes: req.body.notes, checkin: req.body.checkin } };
        
        //Remove unnecessary code which is not used 
        
        // var myqueryy = { emailid: req.body.Email };
        // var newvaluess = { $set: {notess: req.body.notess } };
        dbo.collection("emps").updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
            res.send(result);
        });
    });
});
app.put('/outtime', async (req, res) => {
    
    //remove console
    
    console.log("sdff", req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("demodatabase");
        var myquery = { emailid: req.body.Email };
        var newvalues = { $set: { time: req.body.time, notess: req.body.notess } };
        
        //Remove unnecessary code which is not used 
        
        // var newquery ={notes: req.body.notes};
        dbo.collection("emps").updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("Out Time  document updated");
            db.close();
            res.send(result);
        });
    });
});
app.get('/emps', async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("demodatabase");
        dbo.collection("emps").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result)
        });
    });
})

