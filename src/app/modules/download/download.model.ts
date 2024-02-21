import { Schema, model } from 'mongoose'
import { IDownload, downloadModel } from './download.interface'

const downloadSchema = new Schema<IDownload, downloadModel>(
  {
    assetsId: {
      type: Schema.Types.ObjectId,
      ref: 'Assets',
      required: [true, 'Assets Id Is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    userEmail: {
      type: String,
      required: [true, 'User Email is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Download = model<IDownload, downloadModel>(
  'download',
  downloadSchema,
)
