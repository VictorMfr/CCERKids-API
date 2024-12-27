import mongoose, { model, ObjectId } from "mongoose";
import { ISuperuser, ISuperuserMethods, SuperuserModel } from "../types/models/superuser";
import bcrypt from "bcrypt";

const superuserSchema = new mongoose.Schema<ISuperuser, SuperuserModel, ISuperuserMethods>({
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

    tokens: [String]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

superuserSchema.pre('save', async function (next) {
    const user = this;

    const salt = await bcrypt.genSalt(8);

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, salt);
    }

    if (user.isNew) {
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});


const Superuser = model<ISuperuser, SuperuserModel>('Superuser', superuserSchema);

export default Superuser;
