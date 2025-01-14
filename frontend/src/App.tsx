import { AnimatePresence } from 'framer-motion'
import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import Home from '../src/pages/Home/Home'
import CountryListPage from '../src/pages/CountryListPage/CountryListPage'
import CountryInfoPage from '../src/pages/CountryInfoPage/CountryInfoPage'
import { PublicRoutes } from './constants/routes'

const App: FC = () => {

  useEffect(() => {
    document.title = "Country App"
  }, [])
  
  return (
      <AnimatePresence mode='wait'>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={PublicRoutes.ROOT + '*'} element={<Home />} />
            <Route path={PublicRoutes.COUNTRYLIST} element={<CountryListPage />} />
            <Route path={PublicRoutes.COUNTRYINFO + '/:countryName'} element={<CountryInfoPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
  )
}

export default App
