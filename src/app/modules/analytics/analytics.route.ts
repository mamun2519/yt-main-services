import express from 'express'
import { AnalyticController } from './analytices.controller'
import AuthGuard from '../../middleware/authGuard'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()
router.get('/', AuthGuard(ENUM_USER_ROLE.ADMIN), AnalyticController.GetAnalytic)

export const AnalyticRoute = router
