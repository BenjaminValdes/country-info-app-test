import { Router } from 'express'
import countryRoutes from './country.routes';

const router = Router()

// Modules
router.use('/', countryRoutes)

export default router