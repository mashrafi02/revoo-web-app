import { useState, useEffect } from 'react';
import { useLoginMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const LogIn = ({header="Welcome Back", navigatePath=undefined, onLoggedIn=undefined}) => {

    const [form, setForm] = useState({
                                    email: '', 
                                    password: '', });

    const [error, setError] = useState(null);
    
    const [logIn, {isLoading}] = useLoginMutation();

    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
          navigate(navigatePath || `/${user.username}`, { replace: true });
        }
      }, [user, navigate]);

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
          const userData = await logIn(form).unwrap();
          console.log("Login response:", userData); // 👈 check it
      
          // ✅ Correct path: data.userData
          dispatch(setUser(userData.data.userData));
      
          setForm({ email: '', password: '' });
          setError(null);
          if(onLoggedIn) onLoggedIn(false);
          navigate(navigatePath || `/${userData.data.userData.username}`);
        } catch (err) {
          console.error("Login error:", err);
          setError(err);
        }
      }

  return (

    <div className='pt-16'>
        <form 
            onSubmit={handleSubmit} 
            className="w-[95%] sm:max-w-md mx-auto pt-12 bg-gray-900/80 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-xl space-y-5"
            >
            <h2 className="text-2xl font-bold text-center text-white">{header}</h2>

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
                <Link
                to="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                Forgot Password?
                </Link>
            </div>

            {/* Login Button */}
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isLoading ? "Logging In..." : "Log In"}
            </button>

            {/* Switch to Signup */}
            <p className="text-center text-gray-400 text-sm">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">
                Sign Up
                </Link>
            </p>

            {/* Error Message */}
            {error && (
                <p className="text-center text-red-500 mt-3">
                {error.data?.message || "Invalid email or password"}
                </p>
            )}
        </form>
    </div>
    

  )
}

export default LogIn