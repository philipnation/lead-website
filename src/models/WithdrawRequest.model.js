import mongoose, { Schema, model, models } from "mongoose";

const WithdrawRequestSchema = new Schema(
  {
    requestedAmount: {
      type: Number,
      default: 10,
      required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        default: 'not-started'
    }
  },
  {
    timestamps: true,
  }
);

WithdrawRequestSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const WithdrawRequest =
  models?.WithdrawRequest || model("WithdrawRequest", WithdrawRequestSchema);

export default WithdrawRequest;