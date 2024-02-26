import express from 'express'
import { AnalyticController } from './analytices.controller'

const router = express.Router()
router.get('/', AnalyticController.GetAnalytic)

export const AnalyticRoute = router
