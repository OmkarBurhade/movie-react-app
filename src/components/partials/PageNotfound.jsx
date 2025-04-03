
import { Link, useNavigate } from 'react-router-dom'
import notfound from '/Notfound.jpg'
const PageNotfound = () => {
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
                <h3 className=' text-5xl -mt-60 text-white font-black'>
                    Kya Kya Bhai Kidhar...
                </h3>
                <Link onClick={() => navigate(-1)} className='px-5 py-2 bg-[#6556CD] text-xl text-white font-semibold rounded'>Ghar jaa</Link>
            </div>
        </div >
    )
}

export default PageNotfound