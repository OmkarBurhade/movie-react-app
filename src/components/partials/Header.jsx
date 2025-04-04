
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
    
    return (
        <>
            <div
                style={{
                    background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${data.backdrop_path || data.profile_path || data.poster_path})`,
                    backgroundPosition: "top center",
                    position: "relative",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }} className='w-full h-[80vh] sm:h-[60vh] flex flex-col justify-end sm:justify-end items-start p-8 sm:p-14'>

                <h1 className='text-5xl font-bold text-white w-full sm:w-[70%]'>{data.name || data.title || data.original_name || data.original_title}</h1>
                <p className='text-white w-full sm:w-[70%] mt-3'>{data?.overview ? (<>{data?.overview?.slice(0, 200)}... <Link to={`/${data?.media_type}/details/${data.id}`} className='text-blue-400'>more.</Link></>) : ("")} </p>
                <p className='text-white mt-3'>
                    <i className="text-yellow-300 ri-megaphone-fill"></i> {data.first_air_date || data.release_date} &nbsp;
                    <i className="text-yellow-300 ri-album-fill"></i> {data?.media_type?.toUpperCase()}
                </p>
                <div className='flex gap-2'>
                    <Link target='' to={`/${data.media_type}/details/${data.id}/${data.media_type}`} className='text-white font-semibold px-4 py-2 bg-[#6556CD] mt-3 rounded'>Watch Now</Link>
                    <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='text-white font-semibold px-4 py-2 border-2 border-[#6556CD] mt-3 rounded hover:bg-[#6556CD]'>Watch Trailer</Link>
                </div>
            </div>

        </>

    )
}

export default Header