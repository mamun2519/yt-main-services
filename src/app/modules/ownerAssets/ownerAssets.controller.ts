import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsynFn'
import sendResponse from '../../../shared/sendApiResponse'
import { Request, Response } from 'express'
import { AssetsService } from './ownerAssets.services'

const assetsInsert = catchAsync(async (req: Request, res: Response) => {
  const result = await AssetsService.assetsInsertIntoDB(req)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'wow! assets Upload Successfully',
    data: result,
  })
})

export const AssetsController = {
  assetsInsert,
}
