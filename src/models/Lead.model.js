import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    email: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    phone: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    requirement: {
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

LeadSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Lead =
  models?.Lead || model("Lead", LeadSchema);

export default Lead;