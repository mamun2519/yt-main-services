/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express'

import { IUploadFile } from '../../../interface/file'
import { v2 as cloudinary } from 'cloudinary'
import { IAssets } from './ownerAssets.interface'
import { Assets } from './ownerAssets.model'
const assetsInsertIntoDB = async (req: Request): Promise<IAssets> => {
  const files = req.files as IUploadFile[]
  console.log(files)
  console.log(JSON.parse(req.body.data))
  const data: IAssets = JSON.parse(req.body.data)

  const uploadPromises = files.map(async file => {
    return await cloudinary.uploader.upload(file.path)
  })

  // // Wait for all uploads to complete
  const results = await Promise.all(uploadPromises)
  console.log(results)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFIles = results.map((file: any) => {
    return {
      public_id: file.public_id,
      type: file.format,
      url: file.secure_url,
    }
  })
  //@ts-ignore
  data?.file = uploadFIles
  const finalResult = await Assets.create(data)

  return finalResult
}

export const AssetsService = { assetsInsertIntoDB }
