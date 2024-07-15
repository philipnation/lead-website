import mongoose, { Schema, model, models } from "mongoose";

const PointSchema = new Schema(
  {
    point: {
      type: Number,
      default: 10,
    },
    cashEquivalent:{
        type: Number,
        default: 100
    },
    leadPoint:{
        type: Number,
        default: 10
    }
  },
  {
    timestamps: true,
  }
);

PointSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Point =
  models?.Point || model("Point", PointSchema);

export default Point;