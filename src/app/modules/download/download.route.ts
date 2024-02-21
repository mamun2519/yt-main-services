import express from 'express'
import { downloadController } from './download.controller'
import AuthGuard from '../../middleware/authGuard'
import { ENUM_USER_ROLE } from '../../../enum/user'

const route = express.Router()
route.get(
  '/my-download-history',
  AuthGuard(ENUM_USER_ROLE.USER),
  downloadController.myDownloadHistory,
)
route.get('/:id', downloadController.oneDownloadGet)
route.delete('/:id', downloadController.downloadDelete)
route.patch('/:id', downloadController.updateDownloadById)
route.post('/', AuthGuard(ENUM_USER_ROLE.USER), downloadController.downloadPost)
route.get('/', downloadController.downloadListGet)

export const DownloadRoute = route
