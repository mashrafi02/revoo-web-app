import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL, 
    credentials: 'include',
  }),
  // refetchOnFocus:true,
  endpoints: (builder) => ({
    getPopular: builder.query({
      query: (params) => ({
        url: '/api/v1/movies/popular',
        method: 'GET',
        params
      }),
    }),
    searchMovie: builder.query({
        query: (params) => ({
            url: '/api/v1/movies/search',
            method: 'GET',
            params
        })
    }),
    getMovieDetails: builder.query({
      query: (movieId) => ({
        url: `/api/v1/movies/movie/${movieId}`,
        method: 'GET'
      })
    }),
    getMovieTrailers: builder.query({
      query: (movieId) => ({
        url: `/api/v1/movies/trailer/${movieId}`,
        method: 'GET'
      })
    }),
    getMovieReviews: builder.query({
      query: (movieId) => ({
        url: `/api/v1/movies/reviews/${movieId}`,
        method: 'GET'
      })
    }),
    saveReview: builder.mutation({
      query: ({movieId, movieName, review}) => ({
        url: `/api/v1/movies/save-review/${movieId}`,
        method: 'PATCH',
        body: {review, movieName},
      })
    }),
    toggleFavorite: builder.mutation({
      query: ({movieId, movieName, moviePoster}) => ({
        url: `/api/v1/movies/save-liked-movies/${movieId}`,
        method: 'PATCH',
        body:{movieName, moviePoster}
      })
    }),
    toggleReviewLike: builder.mutation({
      query: ({reviewId,movieId,movieName,review,reviewerUsername }) => ({
        url: `/api/v1/movies/toggle-review-like/${reviewId}`,
        method: 'PATCH',
        body:{
          movieId,
          movieName,
          review,
          reviewerUsername
        }
      })
    }),
    updateReview: builder.mutation({
      query: ({username, reviewId, review}) => ({
        url: `/api/v1/movies/update-review/${username}/${reviewId}`,
        method: 'PATCH',
        body:{review}
      })
    }),
    deleteReview: builder.mutation({
      query: ({username,reviewId}) => ({
        url: `/api/v1/movies/delete-review/${username}/${reviewId}`,
        method: 'DELETE',
      })
    }),
  }),
});

export const {
  useGetMovieReviewsQuery,
  useSaveReviewMutation,
  useToggleFavoriteMutation,
  useGetPopularQuery,
  useGetTopReviewersQuery,
  useGetMovieDetailsQuery,
  useGetMovieTrailersQuery,
  useSearchMovieQuery,
  useToggleReviewLikeMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation
} = movieApi;
