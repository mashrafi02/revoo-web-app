import React from 'react';
import { useState } from 'react';
import EditProfileTab from './EditProfileTab';
import SecurityTab from './SecurityTab';

const UpdatePage = ({avatars, userData, refetch}) => {

    const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row px-5 md:px-0 pt-24 pb-10 text-white relative z-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:pr-6 md:border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <ul className="space-y-4 flex gap-3 md:block md:gap-0 mb-10 md:mb-0">
          <li>
            <button
              onClick={() => setActiveTab("edit")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "edit"
                  ? "bg-red-400 text-white font-semibold cursor-pointer"
                  : "bg-gray-800/70 hover:bg-gray-700 cursor-pointer"
              }`}
            >
              Edit Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "security"
                  ? "bg-red-400 text-white font-semibold cursor-pointer"
                  : "bg-gray-800/70 hover:bg-gray-700 cursor-pointer"
              }`}
            >
              Security
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 md:pl-6">
        {activeTab === "edit" && (
            <EditProfileTab userData={userData} refetch={refetch} avatars={avatars}/>
        )}
        {activeTab === "security" && (
            <SecurityTab />
        )}
      </div>
    </div>
  )
}

export default UpdatePage