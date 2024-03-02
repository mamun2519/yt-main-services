import { Schema, model } from 'mongoose'
import { AssetsModel, IAssets } from './ownerAssets.interface'

const AssetsSchema = new Schema<IAssets, AssetsModel>(
  {
    title: {
      type: String,
      required: [true, 'Title Is Required'],
    },
    // assetURL: {
    //   type: String,
    //   required: [true, 'Asset URL Is Required'],
    // },
    click: {
      type: Number,
      default: 1,
    },
    download: {
      type: Number,
      default: 1,
    },
    finalDownload: {
      type: Number,
      default: 1,
    },

    alternativeText: {
      type: String,
      required: [true, 'Alternative Text Is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description Is Required'],
    },
    metaTitle: {
      type: String,
      required: [true, 'Meta Title URL Is Required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'meta Description Is Required'],
    },
    uploadedUserEmail: {
      type: String,
      required: [true, 'uploaded UserEmail  Is Required'],
    },
    category: {
      type: String,
      required: [true, 'category Text Is Required'],
    },
    subCategory: {
      type: String,
      required: [true, 'Sub Category Text Is Required'],
    },
    tags: {
      tag1: {
        type: String,
      },
      tag2: {
        type: String,
      },
      tag3: {
        type: String,
      },
      tag4: {
        type: String,
      },
      tag5: {
        type: String,
      },
    },
    // jpg: {
    //   url: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    //   type: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    // },
    // png: {
    //   url: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    //   type: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    // },
    // psd: {
    //   url: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    //   type: {
    //     type: String,
    //     required: [true, 'URL  Is Required'],
    //   },
    // },
    file: {
      type: {
        type: String,
        required: [true, 'type Description Is Required'],
      },
      public_id: {
        type: String,
        required: [true, 'public_id Description Is Required'],
      },
      url: {
        type: String,
        required: [true, 'url Description Is Required'],
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Assets = model<IAssets, AssetsModel>('Assets', AssetsSchema)
