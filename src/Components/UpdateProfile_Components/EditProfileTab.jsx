import React from 'react';
import { useState } from 'react';
import { LuPencilLine } from "react-icons/lu";
import { useUpdateMeMutation } from '../../services/userApi';
import ProfileForm from './ProfileForm';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';


const EditProfileTab = ({avatars, userData, refetch}) => {
    const dispatch = useDispatch();
    const [isAvatarModal, setIsAvatarModal] = useState(false);
    
      const [updateMe] = useUpdateMeMutation();
    
      return (
        <div>
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}${userData.avatar}`}
                alt={userData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
            </div>
            <button onClick={() => setIsAvatarModal(true)}
                    className="bg-red-400 p-2 mt-2 rounded-full hover:bg-gray-800 cursor-pointer flex">
                <LuPencilLine className="text-lg text-white font-semibold" /> 
                <span className='font-semibold'>Change Avater</span>
            </button>
          </div>
    
          {/* Form */}
          <ProfileForm userData={userData} refetch={refetch}/>
          
          {isAvatarModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-xl max-w-lg w-full">
                    <h3 className="text-lg font-bold mb-4 text-center">Choose an Avatar</h3>

                    <div className="grid grid-cols-4 gap-4">

                    {avatars.map((a) => (
                        <img
                        key={a}
                        src={`${import.meta.env.VITE_SERVER_URL}${a}`}
                        alt="avatar"
                        className="w-16 h-16 rounded-full border cursor-pointer hover:scale-105 transition"
                        onClick={async () => {
                            try{
                                const {user} = await updateMe({ avatar: a }).unwrap();
                                dispatch(setUser({...user, avatar:a}));
                                refetch()
                            }catch(err) {
                                console.error(err)
                            }
                            setIsAvatarModal(false);
                        }}
                        />
                    ))}
                    </div>
                    <button
                        onClick={() => setIsAvatarModal(false)}
                        className="mt-4 w-full bg-red-400 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold cursor-pointer"
                        >
                        Close
                    </button>
                </div>
            </div>
            )}
        </div>
      );
}

export default EditProfileTab