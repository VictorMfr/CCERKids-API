import { Model, ObjectId } from "mongoose"

export interface IKidsChronogram {
    date: Date,
    bigGroup: {
        title: string,
        target: string,
        biblic_quotes: string[],
        complementary_biblic_quotes: string[],
        teacher: ObjectId,
        helper: ObjectId,
        scheduleDescription: string,
        teacherDrawback: boolean,
        helperDrawback: boolean
    },
    smallGroup: {
        title: string,
        target: string,
        biblic_quotes: string[],
        complementary_biblic_quotes: string[],
        teacher: ObjectId,
        helper: ObjectId,
        scheduleDescription: string,
        teacherDrawback: boolean,
        helperDrawback: boolean
    },
};

export interface IKidsChronogramMethods {}

export interface KidsChronogramModel extends Model<IKidsChronogram, {}, IKidsChronogramMethods> {}