import React from "react";
import { Link } from "react-router-dom";

const LikedMoviesTab = ({ likedMovies }) => {
  
  const imageBase = "https://image.tmdb.org/t/p/original";

  if (!likedMovies || likedMovies.length === 0) {
    return <p className="text-center text-gray-400">No liked movies yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {likedMovies.map((movie, index) => (
        <Link key={index} to={`/movie/${movie.movieId}`}>
            <div               
                className="bg-gray-900/80 p-4 rounded-xl shadow-lg flex flex-col items-center text-white"
                >
                {/* Poster */}
                <img
                    src={movie.moviePoster !== "Not Provided" ? `${imageBase}${movie.moviePoster}` : "/default-movie.png"}
                    alt={movie.movieName}
                    className="w-32 h-48 object-cover rounded-lg mb-4"
                />

                {/* Movie Info */}
                <h3 className="text-lg font-semibold">{movie.movieName}</h3>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default LikedMoviesTab;
