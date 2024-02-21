/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StatusCodes } from 'http-status-codes'
import API_Error from '../../../error/apiError'
import { Assets } from '../ownerAssets/ownerAssets.model'
import { IDownload, IDownloadFilters } from './download.interface'
import { Download } from './download.model'
import { User } from '../user/user.model'
import { IPaginationOptions } from '../../../interface/pagination'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { downloadSearchableFields } from './download.constants'
import { IGenericResponse } from '../../../interface/common'

// URL/download/asset-download (POST)
const saveDownloadIntoDB = async (
  data: IDownload,
  userId: string,
): Promise<IDownload> => {
  const assets = await Assets.findById(data.assets)
  if (!assets) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Assets Not Found')
  }
  assets.download = assets.download + 1
  await assets.save()
  const user = await User.findById(userId)
  if (!user) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  //@ts-ignore
  data.user = userId
  const result = await Download.create(data)
  return result
}

// URL/download/my-download-list (GET)
const getDownloadListFromDB = async (
  filters: IDownloadFilters,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IDownload[]>> => {
  const { searchTerm, ...filterData } = filters

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: downloadSearchableFields.map(filed => ({
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

  const total = await Assets.countDocuments(whereConditions)
  const result = await Download.find(whereConditions)
    .populate('user')
    .populate('assets')
    .skip(skip)
    .limit(limit)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getOneDownloadFromDB = async (id: string): Promise<IDownload | null> => {
  const result = await Download.findById(id)
  return result
}

// URL/favorite/delete-favorite/:id (DELETE)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteOneDownloadFromDB = async (id: string): Promise<any> => {
  const result = await Download.deleteOne({ _id: id })
  return result
}

const updateDownloadByIdIntoDB = async (
  id: string,
  data: Partial<IDownload>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IDownload | null | any> => {
  const result = await Download.updateOne({ _id: id }, data, { new: true })
  return result
}

const myDownloadHistoryFromDB = async (
  userId: string,
): Promise<IDownload[]> => {
  const user = await User.findById(userId)
  console.log(user)
  if (!user) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const result = await Download.find({ user: user._id }).populate('assets')
  return result
}

export const downloadServices = {
  saveDownloadIntoDB,
  getDownloadListFromDB,
  getOneDownloadFromDB,
  deleteOneDownloadFromDB,
  updateDownloadByIdIntoDB,
  myDownloadHistoryFromDB,
}
