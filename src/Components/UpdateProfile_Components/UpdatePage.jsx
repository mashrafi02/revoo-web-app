import React from 'react';
import { useState } from 'react';
import EditProfileTab from './EditProfileTab';
import SecurityTab from './SecurityTab';

const UpdatePage = ({avatars, userData, refetch}) => {

    const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="max-w-6xl mx-auto flex pt-24 pb-10 text-white relative z-10">
      {/* Sidebar */}
      <div className="w-1/4 pr-6 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <ul className="space-y-4">
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
      <div className="w-3/4 pl-6">
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