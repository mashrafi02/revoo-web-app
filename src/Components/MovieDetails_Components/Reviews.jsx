import React from 'react';
import { useState } from 'react';
import { useToggleReviewLikeMutation, useDeleteReviewMutation, useUpdateReviewMutation } from '../../services/movieApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Reviews = ({ data, movieData, isLoading, isError, setIsOpenModal, refetch}) => {

    const user = useSelector(state => state.auth.user);
    
    const[togglRevieLike] = useToggleReviewLikeMutation();
    const[deleteReview] = useDeleteReviewMutation();
    const[updateReview] = useUpdateReviewMutation();

    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedText, setEditedText] = useState("");

    if (isLoading) return <p className="text-center text-white">Loading Reviews...</p>;
    if (isError) return <p className="text-center text-blue-800">Failed to fetch movie Reviews</p>;
    if (!(data?.reviews.length>0)) return;


    async function handleLike(reviewId, review, reviewerUsername) {
        if(user === null) return setIsOpenModal(true);
        try{
            await togglRevieLike({reviewId, 
                                  movieId:movieData.movieId, 
                                  movieName:movieData.title, 
                                  review,
                                  reviewerUsername}).unwrap();
            refetch();
        }catch(err){
            console.error(err)
        }
    }

    async function handleDelete(reviewId, username){
        try{
            await deleteReview({username,reviewId}).unwrap();
            refetch()
        }catch(err){
            console.error(err)
        }
    }

    async function handleEdit (username,reviewId,review) {
        try{
            await updateReview({username, reviewId, review}).unwrap();
            refetch()
        }catch(err){
            console.error(err)
        }
        setEditingReviewId(null);
      };

  return (
    <div className='max-w-7xl mx-auto relative z-10 py-10'>
        <h3 className='text-2xl font-bold text-white pb-10'>Reviews From Our Users</h3>
        {
            data?.reviews.map((review,index) => (
                <div key={index} className='w-full bg-gray-900/70 text-white p-4 rounded-2xl shadow-md mb-4'>
                    <div className="flex items-center mb-2">
                        <img
                            src={`${import.meta.env.VITE_SERVER_URL}${review.avatar}`}
                            alt={review.username}
                            className="w-10 h-10 rounded-full mr-3"
                            />
                        <div>
                            <Link to={user?.username === review.username? `/${review.username}` : `/public-profile/${review.username}`}>
                                <p className="font-semibold">{review.name}</p>
                            </Link>
                            <p className="text-xs text-gray-400">
                                {review.profession} • {review.country}
                            </p>
                        </div>
                    </div>
                    {editingReviewId === review.reviewId ? (
                        <textarea
                            className="bg-gray-800 w-full p-2 rounded-lg text-sm"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            />
                    ) : (
                        <p className="text-gray-300">{review.review}</p>
                    )}

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleLike(review.reviewId, review.review, review.username)}
                                className="flex items-center gap-1 hover:text-blue-400 font-semibold text-white px-6 py-2 bg-blue-600 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                            >
                                👍 Like {review.likeCount}
                            </button>

                            {user?.username === review.username && (
                                <>
                                    {editingReviewId === review.reviewId ? (
                                        <button
                                            onClick={() => handleEdit(review.username, review.reviewId, editedText)}
                                            className="hover:text-green-400 font-semibold text-white px-6 py-2 bg-green-600 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                            >
                                            Save
                                        </button>
                                    ):(
                                        <button
                                            onClick={() => {
                                                setEditingReviewId(review.reviewId);
                                                setEditedText(review.review);
                                            }}
                                            className="hover:text-yellow-400 font-semibold text-white px-6 py-2 bg-yellow-600 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                            >
                                            Edit
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(review.reviewId, review.username)}
                                        className="hover:text-red-400 font-semibold text-white px-6 py-2 bg-red-400 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>

                        <p className="text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Reviews