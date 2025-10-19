import mongoose from 'mongoose';

const clickLogSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      ref: 'Urls', // Referencing the `UrlModel`
    },
    clickedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ipAddress: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ClickLogModel = mongoose.model('ClickLogs', clickLogSchema);

export default ClickLogModel;
