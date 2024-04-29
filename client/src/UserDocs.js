import React, { useState, useContext, useEffect } from 'react'
import './App.css';
import { v4 as uuid } from 'uuid';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from './context';
import { getUserDoc } from './Service/api';
import { DocNameContext } from './Context/DocProvider';
import backgroundImage from './assets/bg_4.jpg';


function UserDocs(userDetails) {
    const {docName, setDocName} = useContext(DocNameContext);
    const [seasons, setSeasons] = useState([])
    const navigate = useNavigate();
    
    const getUserDocFunction = async () => {
        try {
            if (userDetails) {
                console.log(userDetails.user.email);
                const docs = await getUserDoc({email: userDetails.user.email});
                
                setSeasons(docs);
                console.log(docs);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserDocFunction();
        console.log("In here")
    }, [userDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/docs/${uuid()}`)
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-cover bg-no-repeat flex flex-col items-center justify-center h-[100vh]">
            <div className='flex flex-col m-auto p-auto max-w-[70%] max-h-[50%] '>
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 -mb-[80px] items-center align-middle text-center">
                        <div className="w-full px-3 flex flex-col">
                            <label className="tracking-wide text-white font-bold text-[30px] mb-4 italic">
                                Need for a new Doc?
                            </label>
                            <Context.Provider value ={docName}> 
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight border-none focus:border-none focus:outline-none" id="grid-password" placeholder="Enter your project name..." value={docName} onChange={(e) => setDocName(e.target.value)} />
                            </Context.Provider>
                            <p className="text-gray-400 text-xs italic mt-1">Make it as crazy as you'd like</p>
                        </div>
                    </div>
                </form>
            </div>
            <a onClick={handleSubmit} className="hover:cursor-pointer relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md hover:!text-black">
                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-gray-500 group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute hover:text-black"></span>
                <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-[600ms] hover:!text-black">
                    <span className="relative text-white">Create New Doc!</span>
                </span>
            </a>
            <div className='flex flex-col mt-[100px]'>
                <label className="tracking-wide text-white font-bold text-[30px] italic">
                    Previously created Docs
                </label>
            </div>
            <div className="flex flex-col mb-auto mt-5 p-auto max-w-[70%] max-h-[40%] bg-gray-300 bg-opacity-40 backdrop-blur-lg rounded-xl" >
                <div
                    className="flex overflow-x-scroll hide-scroll-bar py-10"
                >
                    <div
                        className="flex flex-nowrap mx-10"
                    >
                        {seasons && seasons.map((season) => (
                            <div className='flex mx-4 rounded overflow-hidden shadow-lg hover:scale-[1.2] duration-150 hover:cursor-pointer text-center justify-center'>
                                <div className="p-7 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a onClick={()=>navigate(`/docs/${season.id}`)}>
                                        <h5 className="text-2xl font-bold p-2 text-gray-900 dark:text-white">{season.name}</h5>
                                    </a>
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
