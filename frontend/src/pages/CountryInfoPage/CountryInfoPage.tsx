import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from '@nextui-org/react'
import { Country } from '../../../models/Country'

const CountryInfoPage = () => {
  const { countryName } = useParams()
  const navigate = useNavigate()

  interface CountryInfo {
    name: string
    flagUrl: string
    borderCountries: Country[]
  }

  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>({
    name: countryName || '',
    flagUrl: '',
    borderCountries: []
  })

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryFlagsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}api/countryFlags/`
        )

        console.log('countryFlagsResponse:', countryFlagsResponse)

        const country = countryFlagsResponse.data.data.find(
          (c: any) => c.name === countryName
        )

        console.log('country:', country)

        if (!country) {
          console.error('Country not found.')
          return
        }
        const borderCountriesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}api/borderCountries/${country.iso2}`
        )

        console.log('borderCountriesResponse:', borderCountriesResponse)

        const borderCountries = borderCountriesResponse.data.borders.map(
          (country: any) => ({key: country.countryCode, label: country.commonName})
        )

        setCountryInfo(prevState => ({
          ...prevState,
          name: prevState?.name || '',
          flagUrl: country.flag || '',
          borderCountries
        }))

      } catch (error) {
        console.error('Error fetching country info:', error)
      }
    }

    fetchCountryData()
  }, [countryName])

  console.log('countryInfo:', countryInfo)

  return (
    <div>
      <h1>Information about: {countryName}</h1>
      {countryInfo && (
        <>
          <img src={countryInfo.flagUrl} alt={`${countryInfo.name} Flag`} />
          <h2>Border Countries:</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {countryInfo.borderCountries.map((country) => (
              <Card
                key={country.key}
                isPressable
                isHoverable
                onPress={() => navigate(`/countryinfo/${country.label}`)}
                className="max-w-full"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary">{country.label}</h3>
                </div>
              </Card>
            ))}
          </div>

          <h2>Population Chart</h2>
          {/* Renderiza el gráfico de población aquí */}
        </>
      )}
    </div>
  )
}

export default CountryInfoPage
