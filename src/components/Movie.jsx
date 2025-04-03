import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./partials/Loading";
import Dropdown from "./partials/Dropdown";
import TopNav from "./partials/TopNav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Movie = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    document.title = "Movie App | Movies ";
    // getting selected data
    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)

            if (data.results.length > 0) {
                setPage(page + 1)
                setMovie((prevState) => [...prevState, ...data.results])
            } else {
                setHasMore(false)
            }

        } catch (error) {
            console.log("Error: ", error);
        }
    };


    const refreshHandler = () => {
        if (movie.length === 0) {
            GetMovie()
        } else {
            setPage(1);
            setMovie([]);
            GetMovie();
        }
    }


    useEffect(() => {
        refreshHandler();
    }, [category]);


    return movie.length > 0 ? (
        <div className="w-full">
            <div className=' md:max-w-screen-xl md:mx-auto h-auto sm:px-10 px-5'>
                <div className='relative mt-5'>
                    <div className='flex justify-start items-center gap-8'>
                        <h1 className='text-2xl font-semibold text-zinc-100'>
                            <i onClick={() => navigate('/')} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line cursor-pointer"></i>
                        </h1>
                    </div>
                    <TopNav />
                </div>
                <div className='flex justify-between py-10  mt-5 sm:mt-0 '>

                    <h1 className='text-2xl font-semibold text-zinc-100'>
                        Movie <small className="text-sm text-zinc-500">({category})</small>
                    </h1>
                    <div className=' flex items-center gap-3 '>
                        <Dropdown title="Category" options={["top_rated", "upcoming", "now_playing"]} func={(e) => setCategory(e.target.value)} />
                    </div>
                </div>
            </div>

            <InfiniteScroll style={{ overflow: "unset" }}
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >

                <Cards data={movie} title='movie' />
            </InfiniteScroll>
        </div>
    ) : (<Loading />);
}

export default Movie