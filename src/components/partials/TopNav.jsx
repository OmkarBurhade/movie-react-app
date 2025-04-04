import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import noimage from '/noimage.png'
const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`)
      setSearches(data.results);

    } catch (error) {
      console.log("Error: ", error);

    }
  }


  useEffect(() => {
    GetSerches();
  }, [query])

  return (
    <div className='z-10 my-2 mx-2 w-full px-5 sm:px-0 sm:w-96 absolute top-10 -right-2 sm:top-0 sm:right-0'>
      <div className='rounded w-full bg-zinc-100 focus-within:bg-zinc-200'>
        <div className='flex items-center justify-center px-3'>

          <label htmlFor="search" className='cursor-pointer'><i className="text-zinc-600 text-2xl ri-search-2-line leading-none"></i></label>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            id='search'
            className='w-full text-zinc-800 mx-10 px-4 py-2 text-md outline-none border-none bg-transparent'
            placeholder='Search Anything' />

          <div className='h-9 w-8 ' >
            {query.length > 0 && <i className='text-zinc-800 text-3xl cursor-pointer ri-close-fill' onClick={() => setQuery('')}></i>}
          </div>
        </div>
        <div className='sticky top-0 max-h-[50vh] overflow-auto'>

          {searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='p-5 w-full border-b-[1px]  border-zinc-300 text-zinc-800 hover:text-black hover:bg-zinc-300 duration-200 font-semibold flex gap-10 justify-start items-center'>
              <img className='w-[12vh] h-full object-contain rounded shadow-md' src={s.poster_path || s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original${s.poster_path || s.backdrop_path || s.profile_path}` : noimage} alt="" />
              <span>{s.name || s.original_name || s.original_title || s.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopNav