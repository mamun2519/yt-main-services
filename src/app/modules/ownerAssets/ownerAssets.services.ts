/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express'

import { IAssets, IAssetsFilters } from './ownerAssets.interface'
import { Assets } from './ownerAssets.model'
import { IPaginationOptions } from '../../../interface/pagination'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { assetsSearchableFields } from './ownerAssets.constants'
import { SortOrder } from 'mongoose'
import { IGenericResponse } from '../../../interface/common'
import API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import natural from 'natural'
import { Keyword } from '../keyword/keyword.model'
const assetsInsertIntoDB = async (req: Request): Promise<IAssets> => {
  // console.log(req.files)
  // const files = req.files as IUploadFile[]
  // console.log(files)

  // const data: IAssets = JSON.parse(req.body.data)

  // const uploadPromises = files.map(async file => {
  //   return await cloudinary.uploader.upload(file.path)
  // })

  // // // Wait for all uploads to complete
  // const results = await Promise.all(uploadPromises)
  // console.log(results)
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const uploadFIles = results.map((file: any) => {
  //   return {
  //     public_id: file.public_id,
  //     type: file.format,
  //     url: file.secure_url,
  //   }
  // })
  // //@ts-ignore
  // data?.file = uploadFIles
  const finalResult = await Assets.create(req.body)

  return finalResult
}

const allAssetsByUserFromDB = async (
  filters: IAssetsFilters,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IAssets[]>> => {
  const { searchTerm, ...filterData } = filters

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)
  const andCondition = []
  if (searchTerm) {
    // implement search keyword store
    // console.log(searchTerm)
    const searchWord = natural.PorterStemmer.stem(searchTerm)
    const searchDataStore = await Keyword.findOne({ searchTerm: searchWord })
    if (searchDataStore) {
      searchDataStore.count = searchDataStore.count + 1
      await searchDataStore.save()
    }
    await Keyword.create({ searchTerm: searchWord })

    andCondition.push({
      $or: assetsSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // filtering
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Assets.find(whereConditions).skip(skip).limit(limit)
  const total = await Assets.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getAssetsIdByUserFromDB = async (id: string): Promise<IAssets | null> => {
  const result = await Assets.findById(id)
  if (!result) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Assets Not Found')
  }
  result.click = result.click + 1
  await result.save()
  return result
}
const getAssetsIdAdminFromDB = async (id: string): Promise<IAssets | null> => {
  const result = await Assets.findById(id)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteAssetsByIdIntoDB = async (id: string): Promise<any> => {
  const result = await Assets.deleteOne({ _id: id })
  return result
}

const updateAssetsByIdIntoDB = async (
  id: string,
  data: IAssets,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const result = await Assets.updateOne({ _id: id }, data, { new: true })
  return result
}

const allAssetsByAdminFromDB = async (
  filters: IAssetsFilters,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IAssets[]>> => {
  const { searchTerm, ...filterData } = filters

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: assetsSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // filtering
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Assets.find(whereConditions).skip(skip).limit(limit)
  const total = await Assets.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
export const AssetsService = {
  assetsInsertIntoDB,
  allAssetsByUserFromDB,
  getAssetsIdByUserFromDB,
  getAssetsIdAdminFromDB,
  deleteAssetsByIdIntoDB,
  updateAssetsByIdIntoDB,
  allAssetsByAdminFromDB,
}
