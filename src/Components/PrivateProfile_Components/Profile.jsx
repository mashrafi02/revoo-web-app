import React, { useEffect } from 'react';
import { useState } from 'react';
import LikedMoviesTab from './LikedMoviesTab';
import LikedReviewsTab from './LikedReviewsTab';
import { Link } from 'react-router-dom';

const Profile = ({user, refetch}) => {

    useEffect(() => {
        setTimeout(() => {refetch();},1000)
    },[])

    const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-10 text-white relative z-10">
      {/* Profile Header */}
      <div className="bg-gray-900/80 p-6 rounded-2xl shadow-xl mb-8 flex items-center gap-6">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}${user.avatar}`}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
        />
        <div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-400">@{user.username}</p>
          <p className="text-gray-400 text-sm">Age: {user.age}</p>
          <p className="text-gray-400 text-sm">{user.profession}</p>
          <p className="text-gray-400 text-sm">Country: {user.country}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 px-4 ${
            activeTab === "reviews"
              ? "border-b-2 border-red-400 text-red-400 cursor-pointer"
              : "text-gray-400 hover:text-white cursor-pointer"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("likedMovies")}
          className={`pb-2 px-4 ${
            activeTab === "likedMovies"
              ? "border-b-2 border-red-400 text-red-400 cursor-pointer"
              : "text-gray-400 hover:text-white cursor-pointer"
          }`}
        >
          Liked Movies
        </button>
        <button
          onClick={() => setActiveTab("likedReviews")}
          className={`pb-2 px-4 ${
            activeTab === "likedReviews"
              ? "border-b-2 border-red-400 text-red-400 cursor-pointer"
              : "text-gray-400 hover:text-white cursor-pointer"
          }`}
        >
          Liked Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="grid gap-6">
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-900/70 p-4 rounded-xl shadow"
                >
                  <Link to={`/movie/${review.movieId}`}>
                    <h4 className="font-semibold text-lg mb-2 text-green-400">
                      {review.movieName || "Unknown Movie"}
                    </h4>
                  </Link>
                  <p className="text-gray-300 italic">"{review.review}"</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Likes: {review.likeCount}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        )}

        {/* Liked Movies */}
        {activeTab === "likedMovies" && (
          <LikedMoviesTab likedMovies={user.likedMovies}/>
        )}

        {/* Liked Reviews */}
        {activeTab === "likedReviews" && (
          <LikedReviewsTab likedReviews={user.likedReviews}/>
        )}
      </div>
    </div>
  )
}

export default Profile