import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className='flex flex-col min-h-screen lg:h-full'>
      <NavBar />
      <div className='grow bg-[#f7f7ff] dark:bg-gray-900'>
        <div className='flex justify-center'>
          <div className='w-full lg:px-[15px] py-[25px] dark:text-white'>
            <Outlet />
          </div>
        </div>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-blue-200 text-black dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
      >
        Toggle Dark Mode
      </button>

    </div>
  );
};
