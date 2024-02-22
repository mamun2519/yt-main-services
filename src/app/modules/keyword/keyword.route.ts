import express from 'express'
import { keywordController } from './keyword.controller'

const router = express.Router()
router.get('/getOneKeyword/:id', keywordController.oneKeywordGet)
router.post('/insertKeyword', keywordController.keywordPost)
router.get('/getKeywords', keywordController.keywordGet)
router.get('/getTrendingKeywords', keywordController.trendingKeywordsGet)

export const KeywordRoute = router
