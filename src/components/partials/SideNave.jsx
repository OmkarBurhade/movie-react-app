import { useState } from 'react'
import { Link } from 'react-router-dom'

const SideNave = () => {
  const [openMenue, setOpenMenue] = useState(true)
  const handleMenue = () => {
    setOpenMenue(!openMenue)
  }

  console.log(openMenue);

  return (
    <>
      <div onClick={handleMenue} className='text-lg text-white left-5 top-3 font-medium fixed z-50 select-none cursor-pointer'>{!openMenue ? ("Close"):("Menu")}</div>


      {!openMenue ? (
        <div className='p-4 fixed left-0 top-0 z-40 bg-[#1F1E24] lg:w-[20%] h-screen lg:sticky lg:top-10 shadow '>
          <div className='mt-10'>
            <h1 className='text-2xl text-white font-bold'>
              <i className="ri-tv-fill text-[#6556CD] mr-2"></i> <span>anymovie</span>
            </h1>
            <nav className='flex flex-col gap-3 text-zinc-400 text-lg'>
              <h1 className='text-white font-semibold text-xl mt-5 sm:mt-10 mb-5'>
                New Feed
              </h1>
              <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-fire-fill mr-2"></i>Trending</Link>
              <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-bard-fill mr-2"></i>Popular</Link>
              <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
              <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-tv-2-fill mr-2"></i>TV Shows</Link>
              <Link to="/person" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-user-community-fill mr-2"></i>People</Link>
            </nav>

            <hr className='border-none h-[1px] bg-zinc-400 mt-5' />

            <nav className='flex flex-col gap-3 text-zinc-400 text-lg'>
              <h1 className='text-white font-semibold text-xl mt-8 mb-5'>
                Website Information
              </h1>
              <Link to={'/about'} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-information-2-fill mr-2"></i>About </Link>
              <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-md px-4 py-2'><i className="ri-phone-fill mr-2"></i>Contact</Link>

            </nav>
          </div>
        </div>
      ) : ("")}


    </>

  )
}

export default SideNave