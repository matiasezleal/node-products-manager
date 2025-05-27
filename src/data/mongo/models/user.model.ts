import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
    },
    img:{
        type: String,
    },
    role: {
        type: [String],
        default: ['user'],
        enum: ['admin', 'user'],
    }

});

export const UserModel = model('User', userSchema);