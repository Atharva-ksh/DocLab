import mongoose from 'mongoose';

const Connection = async () => {
const URL = 'mongodb+srv://admin:admin@cluster1.epipje0.mongodb.net/doclab?retryWrites=true&w=majority&appName=Cluster1'
try{
    await mongoose.connect(URL);
    console.log('database connected');
}
catch(error){
    console.log("Error while connecting with database",error)  
}
}

export default Connection;