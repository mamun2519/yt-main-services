import express from 'express'
import { KeywordRoute } from '../modules/keyword/keyword.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/keyword',
    route: KeywordRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export const ApplicationRootRoute = router
