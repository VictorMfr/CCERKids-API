import { Model, ObjectId } from "mongoose"

export interface IKidsPlanification {
    date: Date,
    group: String
    title: string,
    biblic_quotes: string[],
    target: string,
    complementary_biblic_quotes: string,
};

export interface IKidsPlanificationMethods {}

export interface KidsPlanificationModel extends Model<IKidsPlanification, {}, IKidsPlanificationMethods> {}