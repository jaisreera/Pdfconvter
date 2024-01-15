const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://8479946428ll:rahul%40123456@pdfconveter.bk5phx1.mongodb.net/your-actual-database-name?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', ()=>{
  console.log("successfully connected to database : mongoDB");
});

module.exports = db;
