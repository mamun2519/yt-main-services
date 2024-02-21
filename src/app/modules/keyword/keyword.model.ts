import { IKeyword, KeywordModel } from './keyword.interface'
import { Schema, model } from 'mongoose'

const keywordSchema = new Schema<IKeyword, KeywordModel>(
  {
    searchTerm: {
      type: String,
      required: [true, 'Search Term Is required'],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Keyword = model<IKeyword, KeywordModel>('Keyword', keywordSchema)
