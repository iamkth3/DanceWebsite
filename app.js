const path = require("path");
const express = require("express");
const app = express() ;
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 200;


//DFINE MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the template engine as pug 
app.set('views',path.join(__dirname, 'views'))// set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})
app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")

}).catch(()=>{
    res.status(400).send("Item was not saved to the database")
});
// res.status(200).render('contact.pug',params)
})
//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)


})