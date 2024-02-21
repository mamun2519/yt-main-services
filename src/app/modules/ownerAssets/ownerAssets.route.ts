import express from 'express'
import { AssetsController } from './ownerAssets.controller'
import { FileUploadHelper } from '../../../helper/fileUploader'
const router = express.Router()

router.get('/details-user/:id', AssetsController.getAssetsIdByUser)
router.get('/details-admin/:id', AssetsController.getAssetsIdAdmin)
router.delete('/:id', AssetsController.deleteAssetById)
router.patch('/:id', AssetsController.updateAssetsById)
router.post(
  '/insert',
  FileUploadHelper.upload.array('files', 4),
  AssetsController.assetsInsert,
)
router.get('/all-user', AssetsController.allAssetsByUser)

export const AssetsRoute = router
