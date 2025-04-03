import { useEffect, useState } from 'react'
import SideNave from './partials/SideNave'
import TopNav from './partials/TopNav'
import axios from '../utils/axios';
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './partials/Loading';

const Home = () => {
    document.title = "Movie App | Home";
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("tv")
    const [trendingData, setTrendingData] = useState(["tv", "movie"]);
    const randomIndex = Math.floor(Math.random() * trendingData.length); // Generates 0 or 1

    // getting Header data
    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/${trendingData[randomIndex]}/day`)
            let randomdata = data?.results[(Math.random() * data?.results?.length).toFixed()];
            setWallpaper(randomdata);

        } catch (error) {
            console.log("Error: ", error);
        }
    };

    // getting trending data
    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            setTrending(data.results);

        } catch (error) {
            console.log("Error: ", error);
        }
    };


    useEffect(() => {
        GetTrending();
        !wallpaper && GetHeaderWallpaper();
    }, [category])




    return wallpaper && trending ? (
        <>
            <SideNave />
            <div className='w-[92%] bg-[#1F1E24] h-auto overflow-hidden relative'>
                <TopNav />
                <Header data={wallpaper} />
                <div className='mb-5 px-8 pt-5 flex justify-between'>
                    <h1 className='text-2xl font-semibold text-zinc-100'>Trending</h1>
                    <Dropdown title="Fillter" options={["tv", "movie", "all"]} func={(e) => setCategory(e.target.value)} />
                </div>
                <HorizontalCards data={trending} />
            </div>
        </>
    ) : (<Loading />)
}

export default Home