import { ObjectId } from "mongoose"

export type TOperationService = {
    _id: ObjectId;
    url: string,
    name: string,
    description: string,
    method: string
}