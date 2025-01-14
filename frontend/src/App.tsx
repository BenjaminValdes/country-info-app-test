import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import Home from '../src/pages/Home/Home'
import NotFound from '../src/pages/NotFound/NotFound'
import CountryListPage from '../src/pages/CountryListPage/CountryListPage'
import CountryInfoPage from '../src/pages/CountryInfoPage/CountryInfoPage'
import { PublicRoutes } from './constants/routes'

const App: FC = () => {
  return (
      <AnimatePresence mode='wait'>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={PublicRoutes.ROOT + '*'} element={<Home />} />
            <Route path={PublicRoutes.NOTFOUND} element={<NotFound />} />
            <Route path={PublicRoutes.COUNTRYLIST} element={<CountryListPage />} />
            <Route path={PublicRoutes.COUNTRYINFO + '/:countryName'} element={<CountryInfoPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
  )
}

export default App
