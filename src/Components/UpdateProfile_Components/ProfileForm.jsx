import React from 'react';
import { useState } from 'react';
import { useUpdateMeMutation } from '../../services/userApi';

const ProfileForm = ({userData, refetch}) => {

    const [formData, setFormData] = useState({
            name: userData.name,
            email: userData.email,
            gender: userData.gender,
            age: userData.age,
            country: userData.country,
            profession: userData.profession || "",
          });

    const [updateMe, { isLoading }] = useUpdateMeMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMe(formData).unwrap();
            refetch();
        } catch (err) {
            console.error("Error updating profile", err);
        }
    };

  return (
    <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl space-y-4"
        >
        {/* Name */}
        <div>
            <label className="block mb-1">Name</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Email */}
        <div>
            <label className="block mb-1">Email</label>
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Gender + Age in same row */}
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block mb-1">Gender</label>
            <select
                name="gender"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
                <option defaultValue={userData.gender === 'male'} value="male">Male</option>
                <option defaultValue={userData.gender === 'female'} value="female">Female</option>
                <option defaultValue={userData.gender === 'other'} value="other">Other</option>
            </select>
            </div>

            <div>
            <label className="block mb-1">Age</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>

        {/* Country + Profession in same row */}
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block mb-1">Country</label>
            <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
                <option value="Not provided" disabled>
                    {formData.country || "Select country"}
                </option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Nepal">Nepal</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Maldives">Maldives</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Others">Others</option>
            </select>
            </div>

            <div>
            <label className="block mb-1">Profession</label>
            <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    {formData.profession || "Select profession"}
                </option>
                {[
                    "Doctor",
                    "Engineer",
                    "Teacher",
                    "Student",
                    "Film Director",
                    "Producer",
                    "Actor",
                    "Screenwriter",
                    "Cinematographer",
                    "Editor",
                    "Movie Critic",
                    "Movie Analyst",
                    "Animator",
                    "Composer",
                    "Sound Designer",
                    "Artist",
                    "Business",
                    "Others",
                ].map((prof) => (
                <option key={prof} value={prof}>
                    {prof}
                </option>
                ))}
            </select>
            </div>
        </div>

        {/* Submit */}
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-400 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
            {isLoading ? "Saving..." : "Save Changes"}
        </button>
    </form>

  )
}

export default ProfileForm