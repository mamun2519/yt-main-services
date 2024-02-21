import { Model, Types } from 'mongoose'
import { IAssets } from '../ownerAssets/ownerAssets.interface'
import { IUser } from '../user/user.interface'

export type IDownload = {
  assetsId: Types.ObjectId | IAssets
  userId: Types.ObjectId | IUser
  userEmail: string
}

export type downloadModel = Model<IDownload>
