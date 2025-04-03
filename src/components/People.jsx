import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./partials/Loading";
import TopNav from "./partials/TopNav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";


const People = () => {

  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  document.title = "person App | Person ";
  // getting selected data
  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`)

      if (data.results.length > 0) {
        setPage(page + 1)
        setPerson((prevState) => [...prevState, ...data.results])
      } else {
        setHasMore(false)
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };


  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson()
    } else {
      setPage(1);
      setPerson([]);
      GetPerson();
    }
  }


  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full">
      <div className=' md:max-w-screen-xl md:mx-auto h-auto sm:px-10 px-5'>
        <div className='relative mt-5'>
          <div className='flex justify-start items-center gap-8'>
            <h1 className='text-2xl font-semibold text-zinc-100'>
              <i onClick={() => navigate('/')} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line cursor-pointer"></i>
            </h1>
          </div>
          <TopNav />
          <div className='flex justify-between py-10 mt-5 sm:mt-0 '>

            <h1 className='text-2xl font-semibold text-zinc-100'>
              Person <small className="text-sm text-zinc-500">({category})</small>
            </h1>

          </div>
        </div>

      </div>
      <InfiniteScroll style={{ overflow: "unset" }}
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >

        <Cards data={person} title='person' />
      </InfiniteScroll>
    </div>
  ) : (<Loading />);
}

export default People