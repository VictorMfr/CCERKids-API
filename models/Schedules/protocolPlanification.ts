import mongoose, { model } from "mongoose";
import { ProtocolPlanificationModel, IProtocolPlanification, IProtocolPlanificationMethods } from "../../types/models/protocolPlanification";

const protocolPlanificationSchema = new mongoose.Schema<IProtocolPlanification, ProtocolPlanificationModel, IProtocolPlanificationMethods>({
    date: {
        type: Date,
        required: true
    },
    team: [mongoose.Types.ObjectId]
})

const PPS = model<IProtocolPlanification, ProtocolPlanificationModel>('ProtocolPlanification', protocolPlanificationSchema);

export default PPS;