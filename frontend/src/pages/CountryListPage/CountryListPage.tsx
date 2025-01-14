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
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/countries`)
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
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
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
      <Button onPress={handleGetInfoClick} disabled={!selectedCountry}>
        Get info
      </Button>
    </div>
  )
}

export default CountryListPage