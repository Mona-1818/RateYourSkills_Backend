const mongoose  = require('mongoose');

module.exports = async () =>{
    try{
        mongoose.connect(process.env.Mongo_uri,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
          }).then(() => console.log(`MongoDB Connected: ${mongoose.connection.host}`));
    }catch(err){
        console.log(err)
        process.exit();
    }
};