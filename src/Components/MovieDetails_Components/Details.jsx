import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import { createPortal } from 'react-dom';

import { useSaveReviewMutation, useToggleFavoriteMutation } from '../../services/movieApi';
import MovieTrailers from './MovieTrailers';

const Details = ({movieId, movie, setIsOpenModal, refetch}) => {
    const dispatch = useDispatch();
    const [isOpenTrailer, setIsOpenTrailer] = useState(false);

    const [saveReview, {isLoading}] = useSaveReviewMutation();
    const [toggleFavorite] = useToggleFavoriteMutation();
    const imageBase = "https://image.tmdb.org/t/p/original";
    const user = useSelector(state => state.auth.user);
    const favorite = user?.likedMovies.find(el => el.movieId === Number(movieId));

    const [review, setReview] = useState("");

    function onClose(){
      setIsOpenTrailer(false);
    };

    const handleFavorite = async () => {
        if(user === null) return setIsOpenModal(true);
        try {
            const updatedUser = await toggleFavorite({movieId,
                                                      movieName: movie.title,
                                                      moviePoster: movie.poster_path
                                                      }).unwrap();
            dispatch(setUser(updatedUser.data.user));
        }catch(err){
            console.error('Error updating favorite', err)
        }
      };
    
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if(user === null) return setIsOpenModal(true);
        if (review.trim() === "") return;

        try {
            await saveReview({ movieId, movieName:movie.title, review }).unwrap();
            refetch();
        } catch (err) {
            console.error("Error saving review:", err);
        }
            setReview("");
    };

  return (
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`${imageBase}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-gray-300">“{movie.tagline}”</p>
          )}
          <p className="text-lg text-gray-200">{movie.overview}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <p><span className="font-semibold">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-semibold">Runtime:</span> {movie.runtime} min</p>
            <p><span className="font-semibold">Language:</span> {movie.original_language.toUpperCase()}</p>
            <p><span className="font-semibold">Status:</span> {movie.status}</p>
            <p><span className="font-semibold">Budget:</span> ${movie.budget.toLocaleString() || 'Unknown'}</p>
            <p><span className="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString() || 'Unknown'}</p>
          </div>

          {/* Genres */}
          <div>
            <h3 className="font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g.id} className="px-3 py-1 rounded-full bg-red-500/20 border border-red-400 text-red-300 text-sm">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-lg font-semibold">★ {movie.vote_average.toFixed(1)}</span>
            <span className="text-gray-400">({movie.vote_count} votes)</span>
          </div>

          {/* Homepage Button */}
          <div className="flex gap-4 mt-6">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Visit Official Site
              </a>
            )}
            <button
              onClick={handleFavorite}
              className={`px-6 py-2 rounded-lg transition cursor-pointer ${
                favorite ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {favorite ? "★ Favorited" : "☆ Mark as Favorite"}
            </button>
            <button
              onClick={() => setIsOpenTrailer(true)}
              className="px-6 py-2 rounded-lg transition cursor-pointer bg-red-400 hover:bg-gray-800 font-semibold"
            >
              See Trailer
            </button>
          </div>

          {/* Review Form */}
          <div className="mt-10 bg-gray-900/60 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <textarea
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {isOpenTrailer && createPortal(
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <button
              onClick={onClose}
              className="absolute top-18 right-10 font-bold text-white hover:text-gray-500 text-5xl cursor-pointer"
            >
              &times;
            </button>
            <MovieTrailers movieId={movieId} />
          </div>,
          document.body // 👈 goes outside main/navbar/footer
        )}
      </div>
  )
}

export default Details