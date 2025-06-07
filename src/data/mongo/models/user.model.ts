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
    emailVerified: {
        type: Boolean,
        default: false,
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

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
        delete ret.emailVerified;
    }
});

export const UserModel = model('User', userSchema);