import mongoose from "mongoose";

export const roleSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    permits: [{
        type: mongoose.Types.ObjectId,
        ref: 'Operation'
    }]
});

const Role = mongoose.model('Role', roleSchema);

export default Role;