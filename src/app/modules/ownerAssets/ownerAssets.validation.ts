import { z } from 'zod'

const createAssetsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    alternativeText: z.string({
      required_error: 'Alternative Text  is required',
    }),
    description: z.string({
      required_error: 'title is required',
    }),
    metaTitle: z.string({
      required_error: 'meta Title Text  is required',
    }),
    metaDescription: z.string({
      required_error: 'meta Description Text  is required',
    }),
    uploadedUserEmail: z.string({
      required_error: 'uploadedUser Email is required',
    }),
    tags: z.string({
      required_error: 'tags Text  is required',
    }),
    category: z.string({
      required_error: 'category Text  is required',
    }),
  }),
})

export const AssetsValidation = {
  createAssetsZodSchema,
}
