import { Model, ObjectId } from "mongoose"

export interface IUser {
    _id: ObjectId,
    name: string,
    lastName: string,
    email: string,
    password: string,
    tokens: string[],
    gender: string,
    phoneNumber: string,
    banned: boolean,
    roles: {
        role: ObjectId,
        assigned_at: Date,
        removed_at: Date
    }[],
    firstTimeLogged: boolean
};

export interface IUserMethods {}

export interface UserModel extends Model<IUser, {}, IUserMethods> {}