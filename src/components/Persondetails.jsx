import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';
import noimage from '/noimage.png'
import Dropdown from './partials/Dropdown';
const Persondetails = () => {
    const [category, setCategory] = useState('movie')
    const navigate = useNavigate();
    const { id } = useParams()
    const dispatch = useDispatch();
    const { info } = useSelector((state) => state.person)
    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(asyncloadperson(id))
        return () => {
            dispatch(removeperson());
        }
    }, [pathname]) // you can replace this with "id"

    return info ? (
        <div className='w-full'>

            <div className='md:max-w-screen-xl md:mx-auto pb-8 h-auto sm:px-10 px-5'>
                {/* part one */}
                <nav className='h-20 sticky top-0 text-zinc-300 flex items-center justify-start gap-10 text-xl'>
                    <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line text-xl font-semibold "></Link>
                </nav>

                {/* Part tow */}
                <div className='flex flex-col md:flex-row justify-center items-center gap-x-18 sm:justify-start sm:items-start'>
                    <div className='w-full md:w-80 flex flex-col items-center md:block'>
                        <div>

                            <img className=' rounded-md w-80 shadow-md h-auto object-cover' src={info.detail.profile_path || info.detail.poster_path || info.detail.backdrop_path ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.poster_path || info.detail.backdrop_path}` : noimage} alt="" />
                        </div>

                        <div className='border-1 border-zinc-500 w-full md:mt-5 my-5'></div>
                        <div className='flex flex-col '>
                            {/* Social Media Links */}
                            <div className='text-2xl flex items-center md:flex-col md:items-start gap-5 md:gap-2 text-zinc-400'>
                                <small className='text-[16px] text-white font-medium mb-2'>Social Handels</small>
                                <div className='flex gap-5'>
                                    <Link className=' hover:text-white duration-150' to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} target='_blank'>
                                        <i className="ri-earth-fill"></i>
                                    </Link>
                                    <Link className=' hover:text-white duration-150' to={`https://www.facebook.com/${info.externalid.facebook_id}`} target='_blank'>
                                        <i className="ri-facebook-circle-fill"></i>
                                    </Link>
                                    <Link className=' hover:text-white duration-150' to={`https://www.instagram.com/${info.externalid.instagram_id}`} target='_blank'>
                                        <i className="ri-instagram-fill"></i>
                                    </Link>
                                    <Link className=' hover:text-white duration-150' to={`https://x.com/${info.externalid.twitter_id}`} target='_blank'>
                                        <i className="ri-twitter-x-fill"></i>
                                    </Link>
                                </div>
                            </div>
                            {/* Personal Information */}

                            <h3 className='text-[20px] text-white font-medium my-2 block'>Info</h3>
                            <div className='flex justify-start items-center gap-x-10'>

                                <div className='flex gap-2 w-max '>
                                    <small className='text-[16px] text-white font-medium block'>Known for: </small>
                                    <small className='text-[16px] text-zinc-400 font-normal block'> {info.detail.known_for_department}</small>
                                </div>
                                <div className='flex gap-2 w-max mt-1'>
                                    <small className='text-[16px] text-white font-medium block'>Gender: </small>
                                    <small className='text-[16px] text-zinc-400 font-normal block'> {info.detail.gender === 2 ? "Male" : info.detail.gender === 1 ? "Female" : info.detail.gender === 3 ? "Gey" : ""}</small>
                                </div>
                            </div>
                            {info.detail.birthday && info.detail.deathday && info.detail.place_of_birth ?
                                (
                                    <div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-10'>

                                            <div className='flex gap-2 w-max mt-1'>
                                                <small className='text-[16px] text-white font-medium block'>Birthday: </small>
                                                <small className='text-[16px] text-zinc-400 font-normal block'> {info.detail.birthday}</small>
                                            </div>


                                            <div className='flex gap-2 w-max mt-1'>
                                                <small className='text-[16px] text-white font-medium block'>Deathday: </small>
                                                <small className='text-[16px] text-zinc-400 font-normal block'> {info.detail.deathday}</small>
                                            </div>

                                        </div>
                                        <div className='flex gap-2 w-max mt-1'>
                                            <small className='text-[16px] text-white font-medium block'>Place Of Birthday: </small>
                                            <small className='text-[16px] text-zinc-400 font-normal block'> {info.detail.place_of_birth}</small>
                                        </div>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>

                    <div>
                        <h1 className='text-7xl text-zinc-200 font-black mt-2'>{info.detail.name}</h1>
                        <div className='mt-5'>
                            <h3 className='text-xl text-white font-medium'>Biography: </h3>
                            <p className='text-md mt-2 text-justify text-zinc-300 font-normal'> {info.detail.biography}</p>
                        </div>
                    </div>
                </div>

                <div className='border-1 border-zinc-500 w-full md:mt-18 mt-14'></div>

                {/* part three */}
                <div className='md:mt-10 mt-5'>
                    <h1 className='text-2xl font-semibold text-zinc-100  px-8 mb-5'>Recommendation & Similar </h1>
                    <HorizontalCards data={info.combinedCredits.cast} />
                </div>

                {/* part four */}

                <div className='flex justify-between py-10  mt-5 sm:mt-0 '>

                    <h1 className='text-2xl font-semibold text-zinc-100'>
                        Credits On
                    </h1>
                    <div className=' flex items-center gap-3 '>
                        <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
                    </div>
                </div>

                <div className='list-disc text-zinc-400 w-full h-[50vh] rounded-md mt-5 overflow-x-hidden overflow-y-auto border-[2px] border-zinc-800 p-5'>
                    {info[category + "Credits"].cast.map((c, i) => (
                        <Link key={i} to={`/${category}/details/${c.id}`} className=''>
                            <li className='hover:text-white p-3 rounded hover:bg-zinc-800 duration-150 cursor-pointer list-none'>
                                <span className='text-lg font-semibold'>{c.name || c.original_name || c.title || c.original_title}</span>
                                <span className='block'>{c.character && (`Character Name: ${c.character}`)} </span>
                            </li>
                        </Link>
                    ))}

                </div>
            </div>

        </div>
    ) : (<Loading />)
}

export default Persondetails