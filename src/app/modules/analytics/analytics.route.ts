import express from 'express'
import { AnalyticController } from './analatic.controller'

const router = express.Router()
router.get('/', AnalyticController.GetAnalytic)

export const AnalyticRoute = router
