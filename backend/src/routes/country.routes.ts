import { Router } from 'express'
import countryController from '../controllers/country.controller'

const router = Router();

router.get('/countries', countryController.getAllCountries);
router.get('/borderCountries/:code', countryController.getBorderCountries)
router.get('/populationData', countryController.getPopulationData)
router.get('/countryFlags', countryController.getCountryFlags)

export default router