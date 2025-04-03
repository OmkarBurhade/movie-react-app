
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import VideoNotfound from './VideoNotfound'

const Trailer = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const category = pathname.includes("movie") ? "movie" : "tv"
    const ytvideo = useSelector((state) => state[category].info.videos) // for play trailer

    return (
        <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.9)] text-9xl text-white'>
            <Link onClick={() => navigate(-1)} className=" absolute z-10 text-white top-5 left-5 hover:text-[#6556CD] duration-150 ri-arrow-left-long-line text-xl font-semibold "></Link>
            {ytvideo ? <ReactPlayer
                url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                height={"80%"}
                width={"80%"}
                controls={true}
            /> : (<VideoNotfound />)}
        </div>
    )
}

export default Trailer