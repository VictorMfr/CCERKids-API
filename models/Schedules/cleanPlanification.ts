import mongoose, { model } from "mongoose";
import { CleanPlanificationModel, ICleanPlanification, ICleanPlanificationMethods } from "../../types/models/cleanPlanification";

const cleanPlanificationSchema = new mongoose.Schema<ICleanPlanification, CleanPlanificationModel, ICleanPlanificationMethods>({
    date: {
        type: Date,
        required: true
    },
    team: [mongoose.Types.ObjectId]
})

const CPS = model<ICleanPlanification, CleanPlanificationModel>('CleanPlanification', cleanPlanificationSchema);

export default CPS;