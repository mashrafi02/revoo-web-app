import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const {
    poster_path,
    title,
    release_date,
    vote_average,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="w-[260px] md:w-[240px] bg-gray-900/80 backdrop-blur-xs rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
      {/* Poster */}
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-72 object-cover"
      />

      {/* Info */}
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400">{release_date}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-400">
          <FaStar className="text-base text-yellow-400" />
          <span className="text-sm font-medium">{vote_average?.toFixed(1) || 'N/A'}</span>
        </div>

        {/* Button */}
        <button className="mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
