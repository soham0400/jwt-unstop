const mongoose = require('mongoose')

const mongo_url = "mongodb+srv://sohamaparekh:08hscnYqUgSvtAXc@cluster0.wrssb.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoBD connected....")
    }).catch((err)=>{
        console.log("MongoDB Connection error : ",err)
    })