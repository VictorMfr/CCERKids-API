import { Document, ObjectId } from "mongoose"

export interface IUser extends Document {
    _id: ObjectId,
    name: string,
    lastName: string,
    email: string,
    password: string,
    banned: boolean,
    phoneNumber: string,
    gender: string,
    roles: ObjectId[],
    tokens: string[]
}

