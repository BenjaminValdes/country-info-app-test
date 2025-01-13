import axios from 'axios'

const getAllCountries = async (): Promise<any> => {
  try {
    const response = await axios.get(`https://date.nager.at/api/v3/AvailableCountries`)
      return response.data
  } catch (error) {
    throw new Error('Error fetching countries from external API');
  }
}

const getBorderCountries = async (countryCode: string): Promise<any> => {
  try {
    const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
      return response.data
  } catch (error) {
    throw new Error('Error fetching border countries from external API');
  }
}

const getPopulationData = async (): Promise<any> => {
  try {
    const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`)
      return response.data
  } catch (error) {
    throw new Error('Error fetching population data from external API');
  }
}

const getCountryFlags = async (): Promise<any> => {
  try {
    const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)
      return response.data
  } catch (error) {
    throw new Error('Error fetching country flags from external API');
  }
}

export default { getAllCountries, getBorderCountries, getPopulationData, getCountryFlags }

