import { Model, ObjectId } from "mongoose"

export interface INotification {
    from: string,
    to: ObjectId[] | ObjectId,
    message: string,
    sent_at?: Date
};

export interface INotificationMethods {}

export interface NotificationModel extends Model<INotification, {}, INotificationMethods> {}