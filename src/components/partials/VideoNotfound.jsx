
import { Link, useNavigate } from 'react-router-dom'
import notfound from '/Notfound.jpg'
const VideoNotfound = () => {
    const navigate = useNavigate()


    return (
        <div className='absolute top-0 flex flex-col justify-center items-center w-full h-screen' style={{

            background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.1), rgba(0,0,0,.8)), url(${notfound})`,
            backgroundPosition: "center",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: 'fixed',
        }}  >
            
            <div className='flex flex-col gap-5 items-center' >
                <h3 className=' text-5xl -mt-52 text-white font-semibold'>
                    Video is not available
                </h3>
                <Link onClick={() => navigate(-1)} className='px-4 py-1 bg-[#6556CD] text-lg text-white font-semibold rounded'>Go Back</Link>
            </div>
        </div >
    )
}

export default VideoNotfound