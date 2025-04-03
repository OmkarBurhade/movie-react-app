import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie)
  const { pathname } = useLocation()

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie());
    }
  }, [pathname]) // you can replace this with "id"


  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.6), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.poster_path})`,
      backgroundPosition: "center top",
      position: "relative",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: 'fixed',
    }} className='w-full min-h-screen h-auto relative'>
      <div className='md:max-w-screen-xl md:mx-auto pb-8 h-auto sm:px-10 px-5'>

        {/* part one */}
        <nav className='w-full h-20 sticky top-0 text-zinc-300 flex items-center gap-10 text-xl'>

          <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line text-xl font-semibold "></Link>
          <a href={info.detail.homepage} target='_blank'><i className="ri-external-link-line"></i></a>
          <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} target='_blank'><i className="ri-earth-fill"></i></a>
          <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} target='_blank'>imdb</a>
        </nav>

        {/* part tow Poster Image*/}
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-0 justify-center  lg:grid-cols-2 xl:grid-cols-3'>
          <div className=' md:w-fit w-full md:block md:h-auto h-fit flex flex-col justify-center'>
            <img className=' rounded-md shadow-md h-[600px] md:h-96 lg:h-[450px] object-cover' src={info.detail.profile_path || info.detail.poster_path || info.detail.backdrop_path ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.poster_path || info.detail.backdrop_path}` : noimage} alt="" />
            {/* part three Available on */}
            <div className='hidden mt-2 md:flex flex-col gap-5'>


              {info.watchproviders &&
                info.watchproviders.flatrate &&
                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>Available on Platforms</h3>
                  <div className='grid grid-cols-5 gap-5'>
                    {info.watchproviders.flatrate.map((w) => (
                      <img
                        title={w.provider_name}
                        className='w-12 h-12 object-cover rounded-md'
                        key={w.provider_id}
                        src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                    ))}
                  </div>
                </div>
              }

              {info.watchproviders &&
                info.watchproviders.rent &&
                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>Available on Rent</h3>
                  <div className='flex gap-5'>
                    {info.watchproviders.rent.map((w) => (
                      <img
                        title={w.provider_name}
                        className='w-12 h-12 object-cover rounded-md'
                        key={w.provider_id}
                        src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                    ))}
                  </div>
                </div>
              }


              {info.watchproviders &&
                info.watchproviders.buy &&
                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>Available to Buy</h3>
                  <div className='flex gap-5'>
                    {info.watchproviders.buy.map((w) => (
                      <img
                        title={w.provider_name}
                        className='w-12 h-12 object-cover rounded-md'
                        key={w.provider_id}
                        src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>

          <div className='content lg:w-fit w-full mt-5 md:mt-0 '>
            <h1 className='text-5xl font-bold xl:w-[550px] text-white leading-none'>
              {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            </h1>
            {info.detail.tagline &&
              <h1 className='mt-2 text-xl text-white font-semibold italic'>{(info.detail.tagline)}</h1>
            }
            <div className='lg:min-w-[510px] w-fit grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-4 justify-between '>
              <p className='text-lg text-yellow-400'> <span className='text-zinc-100 '>Release Date: </span> {info.detail.release_date}</p>
              {info.detail.vote_average &&
                <p className='text-lg text-yellow-400'><span className='text-zinc-100 '>User Score: </span> {(info.detail.vote_average * 10).toFixed()}<sup>%</sup></p>
              }
              {info.detail.runtime &&
                <p className='text-lg text-yellow-400'><span className='text-zinc-100 '>Runtime: </span> {(info.detail.runtime)}min</p>
              }

            </div>
            <div className='flex w-fit gap-5'>
              {info.detail.genres.map((g) => (<p key={g.id} className='text-white'><span >• {g.name}</span> </p>))}
            </div>
            <div className='w-fit'>

              <h1 className='text-2xl mt-4 text-white'>Overview</h1>
              <p className='text-white mt-2'>{info.detail.overview}</p>
            </div>
            <div className='w-fit'>
              <h1 className='text-2xl mt-4 text-white'>Movie Translations</h1>
              <p className='text-white mt-2'>{info.translations.join(", ")}</p>
            </div>
            <div className='mt-10 flex gap-4'>
              <Link to={`${pathname}/movie`} className='text-white font-semibold px-4 py-2 bg-[#6556CD] rounded'>Watch Now</Link>
              <Link to={`${pathname}/trailer`} className='text-white font-semibold px-4 py-2 border-2 border-[#6556CD] rounded hover:bg-[#6556CD]'>
                <i className="ri-play-fill"></i> Play Trailer
              </Link>
            </div>
          </div>

        </div>

        {/* part three Available on */}
        <div className='md:hidden mt-2 flex flex-col gap-5'>


          {info.watchproviders &&
            info.watchproviders.flatrate &&
            <div>
              <h3 className='text-lg font-medium text-white mb-2'>Available on Platforms</h3>
              <div className='flex gap-5'>
                {info.watchproviders.flatrate.map((w) => (
                  <img
                    title={w.provider_name}
                    className='w-12 h-12 object-cover rounded-md'
                    key={w.provider_id}
                    src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                ))}
              </div>
            </div>
          }

          {info.watchproviders &&
            info.watchproviders.rent &&
            <div>
              <h3 className='text-lg font-medium text-white mb-2'>Available on Rent</h3>
              <div className='flex gap-5'>
                {info.watchproviders.rent.map((w) => (
                  <img
                    title={w.provider_name}
                    className='w-12 h-12 object-cover rounded-md'
                    key={w.provider_id}
                    src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                ))}
              </div>
            </div>
          }


          {info.watchproviders &&
            info.watchproviders.buy &&
            <div>
              <h3 className='text-lg font-medium text-white mb-2'>Available to Buy</h3>
              <div className='flex gap-5'>
                {info.watchproviders.buy.map((w) => (
                  <img
                    title={w.provider_name}
                    className='w-12 h-12 object-cover rounded-md'
                    key={w.provider_id}
                    src={` https://image.tmdb.org/t/p/original/${w.logo_path}`} />
                ))}
              </div>
            </div>
          }
        </div>



        <div className='border-1 border-zinc-500 w-full md:mt-18 mt-14'></div>
      </div>
      <div className='md:mt-10 mt-5'>
        <h1 className='text-2xl font-semibold text-zinc-100  px-8 mb-5'>Recommendation & Similar </h1>
        {/* part four Available on */}
        <HorizontalCards data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        } />
      </div>
      <Outlet />
    </div>
  ) : (<Loading />);
}

export default Moviedetails