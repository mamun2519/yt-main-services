import express from 'express'
import { KeywordRoute } from '../modules/keyword/keyword.route'
import { AssetsRoute } from '../modules/ownerAssets/ownerAssets.route'
import { DownloadRoute } from '../modules/download/download.route'

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
  {
    path: '/download',
    route: DownloadRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export const ApplicationRootRoute = router
