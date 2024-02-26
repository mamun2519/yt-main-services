import { Download } from '../download/download.model'
import { Assets } from '../ownerAssets/ownerAssets.model'
import { User } from '../user/user.model'
import { IAnalyticsReturn } from './analatic.interface'

const GetAnalyticIntoDB = async (): Promise<IAnalyticsReturn> => {
  const user = await User.countDocuments()
  const download = await Download.countDocuments()
  const assets = await Assets.countDocuments()
  return {
    user,
    download,
    assets,
  }
}

export const AnalyticService = {
  GetAnalyticIntoDB,
}
