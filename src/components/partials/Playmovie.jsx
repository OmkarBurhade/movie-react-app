
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";

    const watchmovie = useSelector((state) => state[category]?.info?.detail); // Ensure safe access
    const embedURL = watchmovie?.id ? `https://vidsrc.icu/embed/${category}/${watchmovie.id}` : null;
    const embedTvURL = watchmovie?.id ? `https://vidsrc.icu/embed/${category}/${watchmovie.id}/1/1` : null;

    return (
        <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.9)] text-white">
            <Link onClick={() => navigate(-1)} className="absolute z-[1000] text-white top-5 right-14 hover:text-[#6556CD] duration-150 text-2xl font-semibold">
                <i className="ri-close-fill"></i>
            </Link>

            {watchmovie?.id ? (
                <iframe height="50%" width="50%" src={category === "tv" ? embedTvURL : embedURL} allowFullScreen></iframe>
            ) : (
                <p className="text-2xl">No video available</p>
            )}
        </div>
    );
};

export default Trailer;
