import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    document.title = "Movie App | Trending";
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    // getting selected data
    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)

            if (data.results.length > 0) {
                setPage(page + 1)
                setTrending((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }

        } catch (error) {
            console.log("Error: ", error);
        }
    };


    const refreshHandler = () => {
        if (trending.length === 0) {
            GetTrending()
        } else {
            setPage(1);
            setTrending([]);
            GetTrending();
        }
    }


    useEffect(() => {
        refreshHandler();
    }, [category, duration]);


    return trending.length > 0 ? (
        <div className='w-full'>
            <div className='w-full md:max-w-screen-xl md:mx-auto h-auto sm:px-10 px-5'>
                <div className='relative mt-5'>
                    <div className='flex justify-start items-center gap-8'>
                        <h1 className='text-2xl font-semibold text-zinc-100'>
                            <i onClick={() => navigate('/')} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line cursor-pointer"></i>
                        </h1>
                    </div>
                    <TopNav />
                    <div className='flex justify-between py-10 mt-5 sm:mt-0 '>

                        <h1 className='text-2xl font-semibold text-zinc-100'>
                            Trending <small className="text-sm text-zinc-500">({category})</small>
                        </h1>
                        <div className=' flex items-center gap-3 '>
                            <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setCategory(e.target.value)} />
                            <Dropdown title="Upload date" options={["week", "day"]} func={(e) => setDuration(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='px-1'>

                    <InfiniteScroll style={{ overflow: "unset" }}
                        dataLength={trending.length}
                        next={GetTrending}
                        hasMore={hasMore}
                        loader={<h1>Loading...</h1>}
                    >

                        <Cards data={trending} title={category} />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    ) : (<Loading />)
}

export default Trending