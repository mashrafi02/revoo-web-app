// components/SignupForm.jsx
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({ name: '', 
                                     age:'', 
                                     email: '', 
                                     password: '', 
                                     confirmPassword: '' });

  const [error, setError] = useState(null);

  const [signUp, {isLoading, isError}] = useSignupMutation();

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  
  useEffect(() => {
    if (user) {
      navigate(`/${user.username}`, { replace: true });
    }
  }, [user, navigate]);

  if(isError) console.log(isError.data?.message)

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const userData = await signUp(form).unwrap();
        dispatch(setUser(userData.data.user));
        setForm({...form, name: '', age:'', email: '', password: '', confirmPassword: ''})
        setError(null);
        navigate(`/${userData.data.user.username}`)
    } catch (err) {
        setError(err)
    }
  }

  return (

    <div className='pt-16 px-2 md:px-0'>
        <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto pt-12 bg-gray-900/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl space-y-5"
            >
            <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>

            <input
                type="text"
                placeholder="Name"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="number"
                placeholder="Enter your age"
                value={form.age}
                required
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                required
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {error && (
                <p className="text-center text-red-500 mt-3">
                {error.data.message || "Error"}
                </p>
            )}
        </form>
    </div>
    

  );
}


export default SignUp