import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsynFn'
import { AnalyticService } from './analytics.services'
import sendResponse from '../../../shared/sendApiResponse'
import { StatusCodes } from 'http-status-codes'
const GetAnalytic = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticService.GetAnalyticIntoDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Fetch  Analytic data successfully',
    data: result,
  })
})

export const AnalyticController = { GetAnalytic }
