import { useEffect, useState } from 'react';
import loader from '/Loading.gif'
const Loading = () => {
   
    const [showMessage, setShowMessage] = useState(false);
    const Message = "Somthis is wrong! Please Reload The Page again!"
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 15000);

        return () => clearTimeout(timer);
    }, [])
    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <img src={loader} alt="" />
            {showMessage && <div className='flex flex-col gap-5 justify-center items-center'>
                <h3 className='text-2xl text-white font-semibold'>
                    {Message}
                </h3>
                <a href='' className='px-4 py-1 bg-[#6556CD] text-lg text-white font-semibold rounded'>Reload</a>
            </div>}
        </div>
    )
}

export default Loading