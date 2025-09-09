import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../services/authApi';
import { useGetPrivateProfileQuery } from '../services/userApi';
import LogIn from './LogIn';
import Profile from '../Components/PrivateProfile_Components/Profile';

const PrivateProfile = () => {

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

  const {data, isLoading, isError, refetch} = useGetPrivateProfileQuery(username);

  if (user && user.username !== username) {
    return (
      <p className="text-xl text-red-400 font-bold p-30">
        You cannot access this profile...
      </p>
    );
  }

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-blue-800">Failed to fetch user data</p>;

  const userData = data?.data?.user;

  function onClose(){
    setIsOpenModal(false);
    navigate('/')
  };

  return (
    <div>
        {
          userData && <Profile user={userData} refetch={refetch}/>
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

export default PrivateProfile