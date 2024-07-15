import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    contactId: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    firstName: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    lastName: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    phoneNumber: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    lookUp: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    imageAvailable: {
      type: Boolean,
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

ContactSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Contact =
  models?.Contact || model("Contact", ContactSchema);

export default Contact;