import express from 'express'
import { AssetsController } from './ownerAssets.controller'
import { FileUploadHelper } from '../../../helper/fileUploader'
const router = express.Router()

router.post(
  '/insert',
  FileUploadHelper.upload.array('files', 4),
  AssetsController.assetsInsert,
)

export const AssetsRoute = router
