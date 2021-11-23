import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    contact: Number,
    profession: String,
    experience: Number,
    description: String,
    aadhaar: Number,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;