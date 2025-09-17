// import mongoose, {Document, Schema} from "mongoose";

// export interface IChat extends Document {
//     users: string[];
//     latestMessage: {
//         text: string;
//         sender: string;
//     };
//     createdAt: Date;
//     updatedAt: Date;
// }

// const userSchema: Schema<IChat> = new Schema(
//     {
//         users: [{type: String, required: true}],
//         latestMessage: {
//             text: String,
//             sender: String,
//         },
//     },
//     {timestamps: true}
// );

// export const Chat = mongoose.model<IChat>("Chat", userSchema);
import mongoose, {Document, Schema} from "mongoose";

export interface IChat extends Document {
    users: string[];
    latestMessage: {
        text: string,
        sender: string; // Who sends the message
    };
    createdAt: Date;
    updatedAt: Date;
}

const schema: Schema<IChat> = new Schema(
    {
        users: [{ type: String, required: true}],
        latestMessage:{
            text: String,
            sender: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.model<IChat>("Chat", schema);