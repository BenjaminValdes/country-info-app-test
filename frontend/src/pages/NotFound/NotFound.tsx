import { Button } from '@nextui-org/react'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  return (
    <main className='grid min-h-full px-6 py-24 place-items-center sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-primary'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Page not found</h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>We are sorry, the page you are looking is not found.</p>
        <div className='flex items-center justify-center mt-10 gap-x-6'>
          <Button onClick={() => navigate(-1)} className=' font-medium rounded-lg text-sm px-5 py-2.5' color='primary'>Go Back</Button>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
