import { Model, Types } from 'mongoose'
import { IAssets } from '../ownerAssets/ownerAssets.interface'
import { IUser } from '../user/user.interface'

export type IDownload = {
  assets: Types.ObjectId | IAssets
  user: Types.ObjectId | IUser
  userEmail: string
}

export type IDownloadFilters = {
  searchTerm?: string
  userEmail?: string
}

export type downloadModel = Model<IDownload>
