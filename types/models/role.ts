import { Model } from "mongoose"

export interface IRole {
    name: string,
    description: string
};

export interface IRoleMethods {}

export interface UserModel extends Model<IRole, {}, IRoleMethods> {}