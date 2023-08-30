const  mongoose = require("mongoose")

const mongoConnection =() =>{
    mongoose.connect("mongodb+srv://saurav:12345@cluster0.tl4yip5.mongodb.net/UserApp?retryWrites=true&w=majority")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Error in connecting" , error);
    });
}

module.exports = mongoConnection;