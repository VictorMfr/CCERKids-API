import { Model, ObjectId } from "mongoose"

export interface ISuperuser {
    _id: ObjectId,
    name: string,
    lastName: string,
    email: string,
    gender: string,
    phoneNumber: string,
    password: string,
    tokens: string[]
};

export interface ISuperuserMethods {}

export interface SuperuserModel extends Model<ISuperuser, {}, ISuperuserMethods> {}