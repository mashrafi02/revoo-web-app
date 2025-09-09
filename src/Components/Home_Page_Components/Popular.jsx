import React from 'react';
import { useGetPopularQuery } from '../../services/movieApi';
import MovieCard from '../MovieCard';
import { Link } from 'react-router-dom';

const Popular = () => {

    const {data, isLoading, isError} = useGetPopularQuery();
    const movies = data?.data?.movies.slice(0,10);

    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (isError) return <p className="text-center text-blue-800">Failed to fetch movies</p>;

  return (
    <div className='max-w-7xl mx-auto text-center relative z-10 mb-10 sm:mb-12 md:mb-24'>
        <h3 className='text-4xl sm:text-5xl font-bold leading-tight mb-16'>
            What's Popular Today
        </h3>
        <div className='flex flex-wrap gap-4 justify-center'>
            {
                movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <MovieCard movie={movie}/>
                    </Link>
                ))
            }
        </div>

        <Link
            to="/popular"
            className="inline-block mt-16 text-xl mx-auto px-6 py-3 bg-red-400 font-semibold text-white rounded-lg hover:bg-gray-700 duration-300"
        >
            See More
        </Link>
    </div>
  )
}

export default Popular