import mongoose from 'mongoose';

const userDocsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const userDocs = mongoose.model('user_docs', userDocsSchema);

export default userDocs;