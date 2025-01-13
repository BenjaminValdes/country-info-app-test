import 'dotenv/config'
import express, { Request, Response } from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT ?? 3001)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(morgan('dev'))
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send({
    name: 'Country Info App',
    environment: app.get('env'),
  })
})

// Api routes
app.use('/api', router)

export default app