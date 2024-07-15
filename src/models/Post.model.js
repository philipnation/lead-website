import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    body: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    category: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Post =
  models?.Post || model("Post", PostSchema);

export default Post;