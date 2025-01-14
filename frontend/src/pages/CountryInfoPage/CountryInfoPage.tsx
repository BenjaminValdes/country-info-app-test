import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from '@nextui-org/react'
import { Country } from '../../../models/Country'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
  const [populationData, setPopulationData] = useState<any>(null)

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryFlagsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/countryFlags/`
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
          `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/borderCountries/${country.iso2}`
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

        const populationResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/populationData/`
        )
        const populationData = populationResponse.data.data.find((c: any) => c.country === countryName)
        
        if (populationData) {
          const years = populationData.populationCounts.map((data: any) => data.year)
          const population = populationData.populationCounts.map((data: any) => data.value)
  
          setPopulationData({
            years,
            population
          })
        }

      } catch (error) {
        console.error('Error fetching country info:', error)
      }
    }

    fetchCountryData()
  }, [countryName])

  const chartData = populationData ? {
    labels: populationData.years, // Asegúrate de que esto sea un arreglo de años
    datasets: [{
      label: 'Population',
      data: populationData.population, // Asegúrate de que esto sea un arreglo de poblaciones
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  } : {
    labels: [],
    datasets: []
  }

  console.log('countryInfo:', countryInfo)

  return (
    <div className="p-4">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <h1 className="text-4xl font-extrabold text-center">{`Information about: ${countryName}`}</h1>
        {countryInfo?.flagUrl && (
          <img
            src={countryInfo.flagUrl}
            alt={`${countryInfo.name} Flag`}
            className="w-12 h-12 object-contain"
          />
        )}
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">Border Countries:</h2>
      {countryInfo && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {countryInfo.borderCountries.map((country) => (
            <Card
              key={country.key}
              isPressable
              isHoverable
              onPress={() => navigate(`/countryinfo/${country.label}`)}
              className="max-w-full"
            >
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium">{country.label}</h3>
              </div>
            </Card>
          ))}
        </div>
      )}

<h2 className="text-2xl font-semibold text-center mt-6 mb-4">Population Chart</h2>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-200 h-48 rounded-lg">
          {populationData && <Line data={chartData} />}
        </div>
      </div>
    </div>
  )
}

export default CountryInfoPage
