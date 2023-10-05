const mongoose = require('mongoose');
//todo+tasks

const mongURI="mongodb+srv://ammuu1320:ammuu1320@cluster0.0gxdqc2.mongodb.net/";
const connectToMongo= async()=>{
     await mongoose.connect(mongURI);
     console.log("connected to mongo successfully");


}
module.exports=connectToMongo;

