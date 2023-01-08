import mongoose, { Schema, Document } from "mongoose";

export  interface AddPost extends Document{
    userId:mongoose.Types.ObjectId;
    descripcion: string;
    img: string[];
    likes: string[];
}

const postSchema:Schema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      descripcion:{
        type: String,
    },
    img: [{
        type: String
    }],
    likes:[{
        type: String
    }]
},{
    timestamps: true,
})

export default mongoose.model<AddPost>("post",postSchema );