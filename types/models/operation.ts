import { Model, ObjectId } from "mongoose"

export interface IOperation {
    name: string,
    description: string,
    url: string,
    method: string
};

export interface IOperationMethods {}

export interface OperationModel extends Model<IOperation, {}, IOperationMethods> {}