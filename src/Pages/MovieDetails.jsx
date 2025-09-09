import Details from "../Components/MovieDetails_Components/Details"
import { useGetMovieReviewsQuery, useGetMovieDetailsQuery } from '../services/movieApi';
import { useParams } from 'react-router-dom';
import LogIn from "../Pages/LogIn";
import { useState } from 'react';
import Reviews from "../Components/MovieDetails_Components/Reviews";


const MovieDetails = () => {
  const {movieId} = useParams();
  const {data, isLoading, isError} = useGetMovieDetailsQuery(movieId);
  const {data:reviews, isLoading: isFething, isError: isProblem, refetch} = useGetMovieReviewsQuery(movieId);
  const movie = data?.data?.movie;
  const imageBase = "https://image.tmdb.org/t/p/original";
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onClose(){
    setIsOpenModal(false);
  };

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-blue-800">Failed to fetch movies</p>;

  return (
    <div
        className="relative min-h-screen text-white pt-24"
        style={{
          backgroundImage: `url(${imageBase}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <Details movieId={movieId} movie={movie} setIsOpenModal={setIsOpenModal} refetch={refetch}/>

        <Reviews data={reviews} movieData={movie} isLoading={isFething} isError={isProblem} setIsOpenModal={setIsOpenModal} refetch={refetch}/>

        {
          isOpenModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                  <button
                      onClick={onClose}
                      className="absolute top-10 right-10 font-bold text-gray-400 hover:text-white text-3xl cursor-pointer"
                      >
                      &times;
                  </button>
                  <LogIn header='You need to log in first' navigatePath={`/movie/${movieId}`} onLoggedIn={setIsOpenModal}/>
              </div>
          )
        }
    </div>
  )   
}
export default MovieDetails