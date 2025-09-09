import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPublicProfileQuery } from "../services/userApi";

const PublicProfile = () => {

  const { username } = useParams();

  const { data, isLoading, isError } = useGetPublicProfileQuery(username);
  const user = data?.data?.user;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60 text-white">
        Loading profile...
      </div>
    );
  }

  if (isError || !data?.data?.user) {
    return (
      <div className="flex justify-center items-center h-60 text-red-400">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 text-white relative z-10">
      {/* User Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-900/70 p-8 rounded-2xl shadow-lg">
        {/* Avatar */}
        <img
          src={`${import.meta.env.VITE_SERVER_URL}${user.avatar}`}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
        />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400 mt-2">Age: {user.age || "Not provided"}</p>
          <p className="text-gray-400">Country: {user.country}</p>
          <p className="text-gray-400">Reviews: {user.reviews?.length || 0}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        {user.reviews && user.reviews.length > 0 ? (
          <div className="space-y-6">
            {user.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <Link to={`/movie/${review.movieId}`}>
                    <h3 className="text-xl font-bold">{review.movieName}</h3>
                </Link>
                <p className="text-gray-400 text-sm mt-1">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-4">{review.review}</p>
                <p className="text-gray-400 text-sm mt-3">
                  👍 {review.likeCount} likes
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
