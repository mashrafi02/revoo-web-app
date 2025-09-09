import { useState } from "react";
import { useGetPopularQuery } from "../services/movieApi"; 
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";
import PaginationBar from "../Components/PopularPage_Components/PaginationBar";

const PopularPage = () => {
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState("default");
  
  const { data, isLoading, isError} = useGetPopularQuery(filters);

  const movies = data?.data?.movies || [];
  const page = data?.page;
  const totalPages = data?.total_pages;

  const handleFilter = (filterType) => {

    setActiveFilter(filterType);

    if (filterType === "hollywood") {
      setFilters({ language: "en" });
    } else if (filterType === "bollywood") {
      setFilters({ language: "hi" });
    } else if (filterType === "bangla") {
      setFilters({ language: "bn" });
    } else if (filterType === "action") {
      setFilters({ genres: 28 }); // TMDB Action genre id
    } else if (filterType === "drama") {
      setFilters({ genres: 18 }); // TMDB Drama genre id
    } else if (filterType === "comedy") {
      setFilters({ genres: 35 }); // TMDB Comedy genre id
    } else {
      setFilters({}); // default
    }
  };

  if (isLoading) return <p className="text-center text-white">Loading popular movies...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load movies</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8 text-white relative z-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          onClick={() => handleFilter("hollywood")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "hollywood" && "orange"
          }}
          disabled={isLoading}>
          Hollywood
        </button>
        <button 
          onClick={() => handleFilter("bollywood")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "bollywood" && "orange"
          }}
          disabled={isLoading}>
          Bollywood
        </button>
        <button 
          onClick={() => handleFilter("bangla")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "bangla" && "orange"
          }}
          disabled={isLoading}>
          Bangla
        </button>
        <button 
          onClick={() => handleFilter("action")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "action" && "orange"
          }}
          disabled={isLoading}>
          Action
        </button>
        <button 
          onClick={() => handleFilter("drama")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "drama" && "orange"
          }}
          disabled={isLoading}>
          Drama
        </button>
        <button 
          onClick={() => handleFilter("comedy")} 
          className="px-4 py-2 bg-gray-800 hover:bg-red-500 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: activeFilter === "comedy" && "orange"
          }}
          disabled={isLoading}>
          Comedy
        </button>
        <button 
          onClick={() => handleFilter("default")} 
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg shadow cursor-pointer disabled:cursor-not-allowed"
          disabled={isLoading}>
          Reset
        </button>
      </div>

      {/* Movie Cards */}
      <div className="grid justify-center justify-self-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      <PaginationBar totalPages={totalPages} currentPage={page} onPageChange={setFilters} />
    </div>
  );
};

export default PopularPage;
