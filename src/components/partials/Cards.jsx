
import { Link } from 'react-router-dom'
import noimage from '/noimage.png'
const Cards = ({ data, title }) => {
    return (
        <div className='flex flex-wrap justify-center gap-10'>
            {data.map((c, i) => (

                <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className=' relative bg-zinc-900 w-72 rounded-md'>
                    <img className='w-full rounded-t-md h-96 object-cover ' src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}` : noimage} alt="" />
                    {c.vote_average &&
                        <div className='text-md text-black font-bold w-10 h-10 bg-amber-400 flex justify-center items-center rounded-full absolute top-2 -right-3'>{(c.vote_average * 10).toFixed()} <sup>%</sup></div>
                    }

                    <div className='flex items-start justify-between p-3'>
                        <h1 className='text-xl font-medium text-white w-[70%] leading-tight'>{c.name || c.title || c.original_name || c.original_title}</h1>
                        <span className='text-sm font-medium text-[#6556CD]'> {c.media_type?.toUpperCase() ? (`• ${c.media_type?.toUpperCase()}`) : ""}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Cards