import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './partials/Loading'
const About = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    return !loading ? (
        <div className='w-full'>
            <div className='md:max-w-screen-xl md:mx-auto pb-8 h-auto sm:px-10 px-5'> {/* part one */}
                <nav className='w-full h-20 sticky top-0 text-zinc-300 flex items-center gap-10 text-xl'>

                    <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] duration-150 ri-arrow-left-long-line text-xl font-semibold "></Link>
                </nav>

                <div className='w-full'>
                    <div className="max-w-3xl mx-auto  p-6 text-center">
                        <h1 className="text-5xl text-white font-bold mb-4">About This Project</h1>
                        <p className="text-xl leading-9 text-zinc-300">
                            This movie application was built by <strong className='text-white'>Omkar Burhade</strong> as a learning project.
                            It showcases my skills in web development using <strong className='text-white'>React.js, Redux Toolkit, API integration, JSX, and Tailwind CSS, and modern UI/UX practices</strong>.
                            The main goal of this project is to improve my understanding of API integration, explore state management, UI design, and front-end performance optimization.
                        </p>
                        <p className="text-xl leading-9 mt-4 text-zinc-300">
                            This project is not for commercial use but rather for educational and portfolio purposes.
                            If you have any feedback or suggestions, feel free to <Link target='_blank' to={'https://www.instagram.com/websitevaala'} className='text-blue-500 underline'> reach out! </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ) : (<Loading />)
}

export default About