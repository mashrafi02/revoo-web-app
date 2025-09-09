import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../services/authApi';
import LogIn from './LogIn';
import UpdatePage from '../Components/UpdateProfile_Components/UpdatePage';
import { useGetAvatarsQuery, useGetPrivateProfileQuery } from '../services/userApi';

const UpdateProfile = () => {

  const {username} = useParams();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const user = useSelector(state => state.auth.user);
  
  const {
    data: meData,
    isLoading: isAuthLoading,
    isError: meError,
  } = useGetMeQuery(undefined, { skip: !!user });

  const meUser =
    user ??
    meData?.data?.user ??
    null;

  useEffect(() => {
    if (!isAuthLoading && !meUser) {
      setIsOpenModal(true);
    }
  }, [isAuthLoading, meUser]);


  const {data, isLoading, isError} = useGetAvatarsQuery();
  // if (isLoading) console.log('Loading avatars...')
  if (isError) console.log('Failed to fetch avatars')

  const  {data:userData, isLoading:isPending, isError:isFailed, refetch} = useGetPrivateProfileQuery(username);
  if (isPending) return <p className="text-center text-white">Loading...</p>;
  if (isFailed) return <p className="text-center text-blue-800">Failed to fetch user data</p>;

  const avatars = data?.avatars;
  const userDetails = userData?.data?.user;


  if (user && user.username !== username) {
    return (
      <p className="text-base text-red-400 font-bold">
        You cannot access this profile...
      </p>
    );
  }


  function onClose(){
    setIsOpenModal(false);
    navigate('/')
  };

  return (
    <div>

        {
            user && <UpdatePage avatars={avatars} userData={userDetails} refetch={refetch}/>
        }

        {
          isOpenModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                  <button
                      onClick={onClose}
                      className="absolute top-10 right-10 font-bold text-gray-400 hover:text-white text-3xl cursor-pointer"
                      >
                      &times;
                  </button>
                  <LogIn header='You need to log in first' navigatePath={`/${username}`} onLoggedIn={setIsOpenModal}/>
              </div>
          )
        }
    </div>
  )
}

export default UpdateProfile