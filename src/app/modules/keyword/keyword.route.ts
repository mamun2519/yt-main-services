import express from 'express'
import { keywordController } from './keyword.controller'

const router = express.Router()

router.post("/insertKeyword", keywordController.keywordPost);
router.get("/getKeywords", keywordController.keywordGet);
router.get("/getOneKeyword", keywordController.oneKeywordGet);
router.get("/getTrendingKeywords", keywordController.trendingKeywordsGet);

export const KeywordRoute = router
