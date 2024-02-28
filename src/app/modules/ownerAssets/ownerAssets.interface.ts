import { Model } from 'mongoose'

export type IAssets = {
  title: string
  click: number
  download: number
  alternativeText: string
  description: string
  metaTitle: string
  metaDescription: string
  uploadedUserEmail: string
  tags: {
    tagOne: string
    tagTwo: string
    tagThree: string
    tagFour: string
    tagFive: string
  }
  finalDownload: number
  category: string
  subCategory: string
  file: {
    type: string
    url: string
    public_id: string
  }
}
export type IAssetsFilters = {
  searchTerm?: string
  category?: string
  username?: string
}

export type AssetsModel = Model<IAssets>
