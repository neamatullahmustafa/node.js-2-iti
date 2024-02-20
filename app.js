const express = require("express");
const bp = require("body-parser");
const fp = bp.urlencoded();
const app = express();
const mongodb = require("mongodb");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require('uuid');

const mdbClient = new mongodb.MongoClient("mongodb://localhost:27017");

let dbo = null;
async function dbInit(){
    await mdbClient.connect();
    dbo = mdbClient.db("ITI");
    app.listen(8080);
}

dbInit();


app.use(fp);
let error = "",
pass="",email="",repass="",phone="",
company="",lName="",fName="";
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs",  { error,
    pass,email,repass,phone,
    company,lName,fName});
});
app.post("/login", (req, res) => {
  pass = req.body.floating_password;
  email = req.body.floating_email;
  company =req.body.floating_company;
  phone = req.body.floating_phone;
  lName=req.body.floating_last_name;
  fName =req.body.floating_first_name;
  repass =req.body.floating_repeat_password;
  // console.log(req.body);
  if (pass.length < 8) {
    error = "pass must be > 8 char";
  res.render("index.ejs", { error,
  pass,email,repass,phone,
  company,lName,fName}); 
   } else {
    error = email= pass= repass=phone=
    company=lName=fName="";
  res.render("index.ejs",  { error,
    pass,email,repass,phone,
    company,lName,fName}); 
  }
});

app.listen(8080);
