import { Model, ObjectId } from "mongoose"

export interface IProtocolPlanification {
    date: Date,
    team: ObjectId[],
};

export interface IProtocolPlanificationMethods {}

export interface ProtocolPlanificationModel extends Model<IProtocolPlanification, {}, IProtocolPlanificationMethods> {}