import mongoose from 'mongoose';

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const user = new schema({
    name: String,
    email: String,
    password: String
})

export default mongoose.model('user', user);