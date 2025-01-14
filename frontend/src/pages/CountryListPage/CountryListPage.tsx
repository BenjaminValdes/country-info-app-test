import { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, SelectItem, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Country } from '../../../models/Country'

const CountryListPage = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country>({ key: '', label: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/countries`)
        const countries = response.data.map((country: any) => ({
          key: country.countryCode,
          label: country.name
        }))
        setCountries(countries)
      } catch (error) {
        console.error('Failed to fetch countries:', error)
      }
    }

    fetchCountries()
  }, [])

  const handleCountryChange = (countryKey: string) => {
    const country = countries.find(c => c.key === countryKey) || { key: '', label: '' }
    setSelectedCountry(country)
  }

  const handleGetInfoClick = () => {
    if (selectedCountry) {
      navigate(`/countryinfo/${selectedCountry.label}`)
    }
  }

  console.log('selectedCountry:', selectedCountry)

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center max-h-screen">
      <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-extrabold text-center">Please select a country</h1>
        <Select
          className="max-w-xs"
          style={{ minWidth: '200px' }}
          label="Country"
          placeholder="Select a country"
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          {countries.map((country) => (
            <SelectItem key={country.key} value={country.key}>
              {country.label}
            </SelectItem>
          ))}
        </Select>
        <Button onPress={handleGetInfoClick} disabled={!selectedCountry} className="mt-4">
          Get info
        </Button>
      </div>
    </div>
  )
}

export default CountryListPage
