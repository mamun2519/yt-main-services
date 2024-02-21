import express from 'express'
import { keywordController } from './keyword.controller'

const router = express.Router()

router.post('/insertKeyword', keywordController.keywordPost)
router.get('/getKeywords', keywordController.keywordGet)
router.get('/getOneKeyword/:id', keywordController.oneKeywordGet)

export const KeywordRoute = router
