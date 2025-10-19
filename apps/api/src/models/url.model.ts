import mongoose from 'mongoose';

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
        message: 'Invalid URL format',
      },
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\//.test(v);
        },
        message: 'Invalid URL format',
      },
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model('Urls', urlSchema);
export default UrlModel;
