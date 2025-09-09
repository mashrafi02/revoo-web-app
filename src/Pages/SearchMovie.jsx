import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSearchMovieQuery } from "../services/movieApi";
import MovieCard from "../Components/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSearch } from "../features/authSlice";

const genresList = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
  { id: 27, name: "Horror" },
];

const sortOptions = [
  { value: "popularity.desc", label: "Popularity (High → Low)" },
  { value: "popularity.asc", label: "Popularity (Low → High)" },
  { value: "vote_average.desc", label: "Rating (High → Low)" },
  { value: "vote_average.asc", label: "Rating (Low → High)" },
  { value: "release_date.desc", label: "Release Date (Newest First)" },
  { value: "release_date.asc", label: "Release Date (Oldest First)" },
];

const languageOptions = [
  { value: "", label: "All Languages" },
  { value: "en-US", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "bn", label: "Bangla" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

const SearchMovie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = useSelector(state => state.auth.currentSearch);
  const dispatch = useDispatch();

  const [search, setSearch] = useState(searchParams.get("name") || currentSearch);
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genres") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [language, setLanguage] = useState(searchParams.get("language") || "");

  // Query object from URL
  const query = searchParams.get("name") || currentSearch
    ? {
        name: searchParams.get("name") || currentSearch,
        genres: searchParams.get("genres") || "",
        sortBy: searchParams.get("sortBy") || "",
        language: searchParams.get("language") || "",
      }
    : null;

  const { data, isLoading, isError } = useSearchMovieQuery(query, {
    skip: !query,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setSearchParams({
      name: search.trim(),
      genres: selectedGenre,
      sortBy,
      language,
    });

    dispatch(setCurrentSearch(""));
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-10 text-white relative z-10">
      <h1 className="text-3xl font-bold text-center mb-8">Search Movies</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[80%] mx-auto bg-gray-900/80 backdrop-blur-xs p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <input
          type="text"
          required
          placeholder="Search a movie here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Genres</option>
          {genresList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {languageOptions.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort By</option>
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-6 py-3 bg-red-400 font-semibold text-white rounded-lg hover:bg-gray-600 transition cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-10 justify-self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && <p className="col-span-full text-center">Loading...</p>}
        {isError && <p className="col-span-full text-center">Error fetching movies</p>}
        {data?.data?.movies?.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMovie;
