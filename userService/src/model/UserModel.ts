import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
},{timestamps:true});

export const User=mongoose.model<IUser>("User",userSchema)