import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      minLength: 4,
      maxLength: 10,
    },
    originalUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\//.test(v);
        },
        message: "Invalid URL format",
      },
    },
  },
  { timestamps: true }
);

// const UrlModel = mongoose.model("UrlModel", urlSchema);
const UrlModel = mongoose.model("Urls", urlSchema);
export default UrlModel;
