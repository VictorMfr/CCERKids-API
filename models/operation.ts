import mongoose from "mongoose";
import { IOperation, IOperationMethods, OperationModel } from "../types/models/operation";

export const operationSchema = new mongoose.Schema<IOperation, OperationModel, IOperationMethods>({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    method: {
        required: true,
        type: String
    }
});

const Operation = mongoose.model<IOperation, OperationModel>('Operation', operationSchema);

export default Operation;