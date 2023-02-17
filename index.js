var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require('dotenv').config()
const port = process.env.PORT || 4000;
const app = express()
app.use(express.json());
mongoose.set('strictQuery', false);
app.use(bodyParser.json())
app.use(express.static('frontend'))
app.use(bodyParser.urlencoded({
    extended: true
}))
const url = process.env.DBHOST;
mongoose.connect(url).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("not connected");
})

const sheema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

const coll = new mongoose.model("user", sheema);



app.post("/sign_up", async (req, res) => {


    var data = new coll({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message

    })

    const aa = await data.save();
    return res.redirect('index.html');


})
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port, () => {
    console.log("server created");
 
});

