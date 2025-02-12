import { Schema, model } from 'mongoose'
import { IDonation, donationModel } from './donation.interface'

const donationSchema = new Schema<IDonation, donationModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    userEmail: {
      type: String,
      required: [true, 'User Email is required'],
    },
    transactionId: {
      type: String,
      required: [true, 'TransactionId Email is required'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'PaymentMethod Email is required'],
    },
    amount: {
      type: Number,
      required: [true, 'PaymentMethod Email is required'],
    },
    status: {
      type: String,
      default: 'Complete',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Donation = model<IDonation, donationModel>(
  'donation',
  donationSchema,
)
