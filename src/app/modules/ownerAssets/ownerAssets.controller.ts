import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsynFn'
import sendResponse from '../../../shared/sendApiResponse'
import { Request, Response } from 'express'
import { AssetsService } from './ownerAssets.services'
import { assetsFilterableFields } from './ownerAssets.constants'
import pick from '../../../shared/pick'
import { IAssets } from './ownerAssets.interface'
import { paginationFiled } from '../../../constant/pagination'

const assetsInsert = catchAsync(async (req: Request, res: Response) => {
  const result = await AssetsService.assetsInsertIntoDB(req)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'wow! assets Upload Successfully',
    data: result,
  })
})

const allAssetsByUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, assetsFilterableFields)
  const paginationOptions = pick(req.query, paginationFiled)
  const result = await AssetsService.allAssetsByUserFromDB(
    filters,
    paginationOptions,
  )
  sendResponse<IAssets[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetch successfully !',
    meta: result.meta,
    data: result.data,
  })
})

export const AssetsController = {
  assetsInsert,
  allAssetsByUser,
}
