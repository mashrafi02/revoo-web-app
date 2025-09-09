import React, { useState } from "react";
import { useUpdatePasswordMutation, useDeleteMeMutation } from "../../services/userApi";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const SecurityTab = () => {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePassword, { isLoading: isUpdating }] = useUpdatePasswordMutation();
  const [deleteMe, { isLoading: isDeleting }] = useDeleteMeMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleClear() {
    setTimeout(() => {
        setSuccess(null);
        setError(null)
    }, 3000)
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePassword(formData).unwrap();
      setSuccess(res.data.message);
      setError(null);
      setFormData({ currentPassword: "", password: "", confirmPassword: "" });
      handleClear();
    } catch (err) {
        setError(err);
        setSuccess(null);
    }
  };


  return (
    <div className="sm:w-[70%] sm:mx-auto bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl space-y-8">
      {/* Change Password Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-red-400">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          {["currentPassword", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">
                {field === "currentPassword" ? "Current Password" : field}
              </label>
              <input
                type="password"
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-red-400 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Update Password"}
          </button>
            {success && (
                    <p className="mt-2 text-green-400 text-sm">{success}</p>
                )}

            {error && (
                    <p className="mt-2 text-red-400 text-sm">
                        {error?.data?.message || "Something went wrong"}
                    </p>
            )}
        </form>
      </div>

      {/* Delete Account Section */}
      <div className="pt-6 border-t border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-red-500 cursor-p">Delete Account</h3>
        <p className="text-gray-400 mb-4">
          Warning: This action is permanent and cannot be undone.
        </p>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isDeleting}
          className="w-full bg-red-600 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full text-center shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Are you sure?</h2>
                <p className="text-gray-300 mb-6">
                    This action cannot be undone. Your account will be permanently deleted.
                </p>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={async () => {
                            try {
                                await deleteMe().unwrap();
                                dispatch(clearUser());
                                navigate("/", { replace: true });
                            } catch (err) {
                                console.error("Error deleting account:", err);
                                alert(err?.data?.message || "Failed to delete account");
                            }
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg font-semibold cursor-pointer"
                        >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
                        >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        )}

    </div>
  );
};

export default SecurityTab;
