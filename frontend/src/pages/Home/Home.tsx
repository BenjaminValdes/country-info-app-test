import { Button, Link } from "@nextui-org/react"

const Home = () => {
  const port = import.meta.env.VITE_APP_PORT || 3000 // Default to 3000 if not set
  const baseUrl = `http://localhost:${port}/countrylist`

  return (
    <div className="flex flex-col items-center justify-start max-h-screen mb-20">
      <h1 className="text-4xl font-extrabold text-center text-white mt-1">
        Welcome to the Country Information Page
      </h1>
      <Button as={Link}
        color="primary"
        href={baseUrl}
        variant="flat"
        className="mt-6 z-10"
      >
        Get Started
      </Button>
      <img 
        src='https://www.globetrottinkids.com/wp-content/uploads/2020/05/world-map-2048x1536.png'
        alt="World Map"
        className="max-w-[40%] h-auto mt-8"
      />
    </div>
  )
}

export default Home