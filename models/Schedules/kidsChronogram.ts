import mongoose, { model } from "mongoose";
import { IKidsChronogram, IKidsChronogramMethods, KidsChronogramModel } from "../../types/models/kidsChronogram";

const kidsChronogramSchema = new mongoose.Schema<IKidsChronogram, KidsChronogramModel, IKidsChronogramMethods>({
    date: {
        type: Date,
        required: true
    },
    bigGroup: {
        title: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        biblic_quotes: [{
            type: String,
            required: true
        }],
        complementary_biblic_quotes: [{
            type: String,
            required: true
        }],
        teacher: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        helper: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        scheduleDescription: {
            type: String
        },
        teacherDrawback: {
            type: Boolean,
            default: false
        },
        helperDrawback: {
            type: Boolean,
            default: false
        }
    }, 
    
    smallGroup: {
        title: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        biblic_quotes: [{
            type: String,
            required: true
        }],
        complementary_biblic_quotes: [{
            type: String,
            required: true
        }],
        teacher: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        helper: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        scheduleDescription: {
            type: String
        },
        teacherDrawback: {
            type: Boolean, 
            default: false
        },
        helperDrawback: {
            type: Boolean,
            default: false
        }
    }
});

const KCS = model<IKidsChronogram, KidsChronogramModel>('KidsChronogram', kidsChronogramSchema);

export default KCS;