import React from "react";
import { useGetTopReviewersQuery } from "../../services/userApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopReviewers = () => {
  const currentUser = useSelector(state => state.auth.user)
  const {data, isLoading, isError} = useGetTopReviewersQuery();

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-blue-800">Failed to fetch data</p>;

  const users = data?.data?.users;

  if (!users || users.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-34 text-white relative z-10">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Top Reviewers</h2>

      <div className="flex flex-col gap-6 p-2 sm:p-4 md:p-0">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            {/* User Info */}
            <Link
              to={
                currentUser?.username === user.username
                  ? `/${user.username}`
                  : `/public-profile/${user.username}`
              }
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${user.avatar}`}
                  alt={`${user.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                />

                {/* User Text Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400">@{user.username}</p>
                  {user.country && (
                    <p className="text-gray-400 text-sm">Country: {user.country}</p>
                  )}
                  {user.profession && (
                    <p className="text-gray-400 text-sm">Profession: {user.profession}</p>
                  )}
                  <p className="text-yellow-400 font-semibold">
                    Total Likes: {user.totalLikes}
                  </p>
                </div>
              </div>
            </Link>

            {/* Best Liked Review */}
            <div className="bg-gray-800/60 p-4 rounded-lg flex flex-col gap-2">
              <h4 className="text-base text-gray-300 font-semibold mb-2">
                Best Review
              </h4>
              <p className="text-gray-300 italic">
                "{user.bestLikedReview.review}"
              </p>
              <div className="flex flex-wrap justify-between text-gray-400 text-sm">
                <Link to={`/movie/${user.bestLikedReview.movieId}`}>
                  <span className="text-yellow-400 font-semibold">
                    <span className="text-green-400">Movie:</span> {user.bestLikedReview.movieName || "Not Found"}
                  </span>
                </Link>
                <span>Likes: {user.bestLikedReview.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default TopReviewers;
