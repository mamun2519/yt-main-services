import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsynFn'
import { StatusCodes } from 'http-status-codes'
import { KeywordService } from './keyword.services'
import sendResponse from '../../../shared/sendApiResponse'

const keywordPost = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.keywordPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'keyword posted successfully',
    data: result
  })
})

const keywordGet = catchAsync(async (req: Request, res: Response) => {
    const result = await KeywordService.getKeywordsFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Got List of all keyword",
        data: result
    })
})

const oneKeywordGet = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.getOneKeywordFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Got the identified keyword",
    data: result
  })

})

export const keywordController = {
  keywordPost,
  keywordGet,
  oneKeywordGet
}