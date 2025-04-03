import { Link } from "react-router-dom"
import noImage from '/no-image.png'
import { useEffect, useRef } from "react";

const HorizontalCards = ({ data }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = (event) => {
      if (
        (event.deltaY > 0 && container.scrollLeft < container.scrollWidth - container.clientWidth) ||
        (event.deltaY < 0 && container.scrollLeft > 0)
      ) {
        event.preventDefault(); // Prevent vertical scroll
        container.scrollLeft += event.deltaY; // Scroll horizontally
      }
    };

    // Attach event listener with { passive: false }
    container.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);


  return (
    <div className='w-full px-8 '>
      <div
        ref={scrollContainerRef}
        className=' flex justify-start gap-5 overflow-x-auto mb-5'>
        {data.length > 0 ? data.map((d, i) => (

          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-80 w-80 bg-zinc-900 rounded-sm mb-2'>

            <img className='w-full h-auto overflow-hidden whitespace-nowrap rounded-t-sm' src={d.backdrop_path || d.profile_path ? (` https://image.tmdb.org/t/p/original${d.backdrop_path || d.profile_path}`) : (noImage)} alt="" />
            <div className='p-3'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-white w-[80%]'>{d.name || d.title || d.original_name || d.original_title}</h1>
                <span className='text-sm font-medium text-[#6556CD]'>{d?.media_type ? (<>•{d.media_type.toUpperCase()}</>) : ("")}</span>
              </div>
              <p className='text-white font-normal mt-3'>{d.overview ? (<>{d.overview.slice(0, 100)}... <span className='text-zinc-500'>more.</span></>) : ("")} </p>
            </div>
          </Link>
        )) : (
          <div className="w-full h-[30vh] justify-center items-center">
            <h1 className="text-xl text-zinc-300 font-light text-center mt-5">Nothing to show</h1>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default HorizontalCards