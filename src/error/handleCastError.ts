import mongoose from 'mongoose'
//* Handle error
import { IGenericErrorMessage } from '../interface/error'
const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]
  const statusCode = 4000
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}

export default handleCastError
