import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentSearch } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";


const Hero = () => {

   const dispatch = useDispatch();
   const [search, setSearch] = useState("");
   const navigate = useNavigate();

   function handleSubmit(e) {
    e.preventDefault();
    const searchMovie = search.trim();
    if (searchMovie == "") return;

    try{
        dispatch(setCurrentSearch(searchMovie));
        setSearch("");
        navigate('/search');
    }catch(err){
        console.log(err.message)
    }
}


  return (
    <div>
        <div className="relative z-10 px-6 pt-30 pb-20 sm:py-30 flex flex-col items-center text-center">

        <form
            onSubmit={handleSubmit}
            className="w-[95%] sm:w-[80%] md:w-[60%] mx-auto mt-18 bg-gray-900/80 backdrop-blur-xs p-1 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-1 sm:gap-4"
            >
            <input
                type="text"
                required
                placeholder="Search a movie here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                className="hidden sm:hidden md:inline-block px-6 py-3 bg-red-400 font-semibold text-white rounded-lg hover:bg-gray-600 transition cursor-pointer"
            >
                Search
            </button>
            <button
                type="submit"
                className="md:hidden px-2 sm:px-4 py-3 bg-red-400 font-semibold text-white rounded-lg hover:bg-gray-600 transition cursor-pointer"
            >
                <IoSearchSharp className='font-bold text-xl'/>
            </button>
        </form>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mt-14 sm:mt-26">
                Discover & Review <span className="text-sky-400">Movies</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl font-semibold text-white">
                Dive into trending films, explore ratings, and share your thoughts
                with the community.
            </p>
        </div>
    </div>
  )
}

export default Hero