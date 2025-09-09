import React, { useState, useEffect } from 'react'
import { useGetMovieTrailersQuery } from '../../services/movieApi'

const MovieTrailers = ({movieId}) => {
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const {data, isLoading, isError} = useGetMovieTrailersQuery(movieId);

    const trailers = data?.data?.trailers;

    useEffect(() => {
        if (trailers && Object.values(trailers).length > 0) {
          setSelectedTrailer(Object.values(trailers)[0]);
        } else {
          setSelectedTrailer(null);
        }
      }, [trailers]);

    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (isError) return <p className="text-center text-blue-800">Sorry...Failed to fetch movie trailers</p>;

    if (!trailers || Object.keys(trailers).length === 0) {
        return <p className="text-center text-gray-400">Sorry...No trailers available for this movie</p>;
    }

  return (
    <div className="w-[95%] sm:w-[80%] mx-auto py-10 px-4 text-white relative z-10">
      <h2 className="hidden md:block text-3xl font-bold mb-6">Watch Trailers</h2>

      <div className="flex flex-col md:flex-row gap-2 md:gap-6">
        {/* Left Section (Trailer List) */}
        <div className="w-full md:w-1/4  bg-gray-900/80 rounded-xl shadow-lg p-4 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Available Languages
          </h3>
          {Object.entries(trailers).map(([lang, url], index) => (
            <button
              key={index}
              onClick={() => setSelectedTrailer(url)}
              className={`px-3 py-2 rounded-lg text-left transition ${
                selectedTrailer === url
                  ? "bg-yellow-500 text-black font-semibold"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right Section (Iframe) */}
        <div className="flex-1 bg-gray-900/80 rounded-xl shadow-lg p-4">
          {selectedTrailer ? (
            <div className="w-full rounded-xl overflow-hidden shadow-md">
              <iframe
                src={selectedTrailer.replace("watch?v=", "embed/")}
                title="Movie Trailer"
                className="w-full h-auto min-h-[180px] sm:min-h-[200px] md:min-h-[320px] lg:min-h-[400px] max-h-[70vh]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-400">Select a trailer to watch</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieTrailers