import express from 'express'
import { KeywordRoute } from '../modules/keyword/keyword.route'
import { AssetsRoute } from '../modules/ownerAssets/ownerAssets.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/keyword',
    route: KeywordRoute,
  },
  {
    path: '/assets',
    route: AssetsRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export const ApplicationRootRoute = router
