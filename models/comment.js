const { Schema, model } = require("mongoose");
//  now we want that the loggedin user can comment
const commentSchema = new Schema({
    content:{
        type: String,
        required: true,
    },
    blogId:{ // kis vlog ke liye comment kiya hai
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    createdBy:{ //kis user ne comment dala hai
        type: Schema.Types.ObjectId,
        ref: "user",
    }
}, {timestamps: true});

const Comment = model("comment",commentSchema);

module.exports = Comment;