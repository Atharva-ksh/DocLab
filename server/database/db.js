import mongoose from 'mongoose';

const Connection = async (username = 'user',password = 'doclab') => {
const URL = 'mongodb+srv://user:doclab@doclabai.rrnvbiv.mongodb.net/?retryWrites=true&w=majority'
try{
    await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true });
    console.log('database connected');
}
catch(error){
    console.log("Error while connecting with database",error)  
}
}

export default Connection;

