import { NextFunction, Request, Response } from 'express'
import countryService from '../services/country.service'

//Get all countries
const getAllCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const countries = await countryService.getAllCountries()
    res.json(countries)
  } catch (error) {
    next(error)
  }
}

//Get border countries
const getBorderCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { code } = req.params
  try {
    const countries = await countryService.getBorderCountries(code)
    res.json(countries)
  } catch (error) {
    next(error)
  }
}

//Get population data
const getPopulationData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await countryService.getPopulationData()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const getCountryFlags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const countryFlags = await countryService.getCountryFlags()
    res.json(countryFlags)
  } catch (error) {
    next(error)
  }
}

export default { getAllCountries, getBorderCountries, getPopulationData, getCountryFlags }