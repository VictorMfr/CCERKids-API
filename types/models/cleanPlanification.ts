import { Model, ObjectId } from "mongoose"

export interface ICleanPlanification {
    date: Date,
    team: ObjectId[],
};

export interface ICleanPlanificationMethods {}

export interface CleanPlanificationModel extends Model<ICleanPlanification, {}, ICleanPlanificationMethods> {}