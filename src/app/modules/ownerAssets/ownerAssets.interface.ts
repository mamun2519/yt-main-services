import { Model } from 'mongoose'

export type IAssets = {
  title: string
  // assetURL: string
  click: number
  download: number
  alternativeText: string
  description: string
  metaTitle: string
  metaDescription: string
  uploadedUserEmail: string
  tags: string
  finalDownload: number
  category: string
  // jpg: {
  //   url: string
  //   type: string
  // }
  // png: {
  //   url: string
  //   type: string
  // }
  // psd: {
  //   url: string
  //   type: string
  // }
  file: [
    {
      type: string
      url: string
      public_id: string
    },
  ]
}
export type IAssetsFilters = {
  searchTerm?: string
  category?: string
  username?: string
}

export type AssetsModel = Model<IAssets>
