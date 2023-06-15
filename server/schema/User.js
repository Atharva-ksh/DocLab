import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // mailID: {
    //     type: String,
    //     required: true
    // },
    // imageUrl: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    // name: {
    //     type: String,
    //     required: true
    // }
})

const user = mongoose.model('users', userSchema);

export default user;