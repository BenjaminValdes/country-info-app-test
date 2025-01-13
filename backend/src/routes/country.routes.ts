import { Router } from 'express'
import countryController from '../controllers/country.controller'

const router = Router();

router.get('/countries', countryController.getAllCountries);
router.get('/borderCountries/:id', countryController.getBorderCountries)
router.get('/populationData', countryController.getBorderCountries)
router.get('/countryFlags', countryController.getCountryFlags)

export default router