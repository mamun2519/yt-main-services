import express from 'express'
import { AssetsRoute } from '../modules/ownerAssets/ownerAssets.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/assets',
    route: AssetsRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export const ApplicationRootRoute = router
