import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsynFn'
import { downloadServices } from './download.services'
import sendResponse from '../../../shared/sendApiResponse'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload } from 'jsonwebtoken'

const downloadPost = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await downloadServices.saveDownloadIntoDB(
    req.body,
    user.userId as string,
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'download  posted successfully',
    data: result,
  })
})

const downloadListGet = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.getDownloadListFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get Download  List successfully',
    data: result,
  })
})

const oneDownloadGet = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.getOneDownloadFromDB(req.params.id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get the identified Download history',
    data: result,
  })
})

const downloadDelete = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.deleteOneDownloadFromDB(req.params.id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Delete one download history',
    data: result,
  })
})

const updateDownloadById = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.updateDownloadByIdIntoDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Download history',
    data: result,
  })
})
const myDownloadHistory = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await downloadServices.myDownloadHistoryFromDB(
    user.userId as string,
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My Download History successfully',
    data: result,
  })
})

export const downloadController = {
  downloadPost,
  downloadListGet,
  oneDownloadGet,
  downloadDelete,
  updateDownloadById,
  myDownloadHistory,
}
