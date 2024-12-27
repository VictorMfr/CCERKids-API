import mongoose, { model } from "mongoose";
import { IKidsPlanification, KidsPlanificationModel, IKidsPlanificationMethods } from "../../types/models/kidsPlanification";

const kidsPlanificationSchema = new mongoose.Schema<IKidsPlanification, KidsPlanificationModel, IKidsPlanificationMethods>({
    title: {
        type: String,
        required: true
    },   
    target: {
        type: String,
        required: true
    },
    biblic_quotes: [{
        type: String,
        required: true
    }],
    complementary_biblic_quotes: [{
        type: String,
        required: true
    }]
});

const KPS = model<IKidsPlanification, KidsPlanificationModel>('KidsPlanification', kidsPlanificationSchema);

export default KPS;