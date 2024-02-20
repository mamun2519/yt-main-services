import app from './app'
import { Server } from 'http'
import mongoose from 'mongoose'
import config from './config'
// Main Server
const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connect')
    const server: Server = app.listen(config.port, () => {
      console.log(`server Is Run Successfully PORT NO- ${config.port}`)
    })
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log('Server closed')
          process.exit(1)
        })
      } else {
        process.exit(1)
      }
    }

    const unexpectedErrorHandler = (error: unknown) => {
      console.log(error)
      exitHandler()
    }

    process.on('uncaughtException', unexpectedErrorHandler)
    process.on('unhandledRejection', unexpectedErrorHandler)

    process.on('SIGTERM', () => {
      console.log('SIGTERM received')
      if (server) {
        server.close()
      }
    })
  } catch (error) {
    console.log(error)
  }
}

bootstrap()
