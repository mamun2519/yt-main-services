import { Donation } from '../donation/donation.model'
import { Download } from '../download/download.model'
import { Assets } from '../ownerAssets/ownerAssets.model'
import { User } from '../user/user.model'
import { IAnalyticsReturn } from './analytics.interface'

const GetAnalyticIntoDB = async (): Promise<IAnalyticsReturn> => {
  const user = await User.countDocuments()
  const download = await Download.countDocuments()
  const assets = await Assets.countDocuments()
  const donationData = await Donation.find({})
  const TotalDonation = donationData
    .map(data => {
      return data.amount
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  return {
    user,
    download,
    assets,
    TotalDonation,
  }
}

export const AnalyticService = {
  GetAnalyticIntoDB,
}
