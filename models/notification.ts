import mongoose from "mongoose";
import { INotification, INotificationMethods, NotificationModel } from "../types/models/notification";

export const notificationSchema = new mongoose.Schema<INotification, NotificationModel, INotificationMethods>({
    from: {
        required: true,
        type: String
    },
    to: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value: any) {
                return typeof value === 'string' || (Array.isArray(value) && value.every(item => typeof item === 'string'));
            },
            message: (props: any) => `${props.value} no es un string ni una lista de strings!`
        }
    },
    message: {
        type: String,
        required: true
    },
    sent_at: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;