const express = require("express");
var cors = require('cors')
var app = express()
 
app.use(cors())
app.use(express.json())

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/DB');

app.use("/api/auth",require("./routes/auth"))
app.use("/api/note",require("./routes/notes"))


app.listen(5000,function(){
   console.log("Server is running on port 5000")
})

