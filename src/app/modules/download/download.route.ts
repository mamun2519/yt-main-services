import express from 'express'
import { downloadController } from './download.controller'

const route = express.Router()
route.get('/:id', downloadController.oneDownloadGet)
route.delete('/:id', downloadController.downloadDelete)
route.patch('/:id', downloadController.updateDownloadById)
route.post('/', downloadController.downloadPost)
route.get('/', downloadController.downloadListGet)

export const DownloadRoute = route
