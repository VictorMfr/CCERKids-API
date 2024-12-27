import mongoose, { model } from "mongoose";
import { UserModel, IUser, IUserMethods } from "../types/models/user";
import bcrypt from "bcrypt";

const userRoleSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    assigned_at: {
        required: true,
        type: Date,
    },
    removed_at: {
        type: Date,
        default: null
    }
}, { _id: false });

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    banned: {
        type: Boolean,
        default: false
    },
    firstTimeLogged: {
        type: Boolean,
        default: true
    },
    roles: [userRoleSchema],

    tokens: [String]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {
        const salt = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password, salt);
        user.firstTimeLogged = false;
    }

    next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;