import React from 'react'
import './App.css';
import { v4 as uuid } from 'uuid';

function UserDocs() {
    const seasons = ["CapStone", "Algorithms", "Internship", "MCS Offer", "API Docs"];

    return (
        <div className="bg-[url('https://luanedcosta.github.io/react-tailwindcss-glassmorphism/static/media/Background.d63a681d.jpg')] flex flex-col items-center justify-center h-[100vh]" >
            <div className='flex flex-col m-auto p-auto max-w-[70%] max-h-[50%] bg-gray-300 bg-opacity-40 backdrop-blur-lg rounded-xl hover:!text-black'>
                <a href={`/docs/${uuid()}`} className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md hover:!text-black">
                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute hover:text-black"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-[600ms] hover:!text-black">
                        <span className="relative text-white">Create New Doc!</span>
                    </span>
                </a>
            </div>
            < div class="flex flex-col m-auto p-auto max-w-[70%] max-h-[40%] bg-gray-300 bg-opacity-40 backdrop-blur-lg rounded-xl" >
                <div
                    class="flex overflow-x-scroll hide-scroll-bar py-10"
                >
                    <div
                        class="flex flex-nowrap mx-10"
                    >
                        {seasons.map((season) => (
                            <div class="mx-5 max-w-sm rounded overflow-hidden shadow-lg hover:scale-[1.1] duration-120 hover:cursor-pointer">
                                <div class="inline-block">
                                    <a href="http://localhost:3000/docs/f7eda9f2-389d-48ac-a8a2-01220da95f70" class="relative inline-flex items-center justify-center inline-block px-6 py-6 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
                                        <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                                        <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                                            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                                            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                                        </span>
                                        <span class="relative font-bold italic text-black">{season}</span>
                                    </a>
                                    {/* <div class="px-6 py-4">
                                        <div class="font-bold text-xl mb-2">{season}</div>
                                        <p class="text-gray-700 text-base">
                                            {season}
                                        </p>
                                        <p class="text-gray-700 text-base">
                                            {season}
                                        </p>
                                        <p class="text-gray-700 text-base">
                                            {season}
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDocs