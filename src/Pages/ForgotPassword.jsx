import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../services/authApi';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
          navigate(`/${user.username}`, { replace: true });
        }
      }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await forgotPassword({ email }).unwrap();
      setSuccessMsg(res.message || 'Password reset link has been sent to your email.');
      setEmail('');
      // Optionally redirect after some delay
      // setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-white">Forgot Password</h2>
      <p className="text-gray-400 text-center text-sm">
        Enter your email to receive a reset password link.
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>

      {/* Switch back to login */}
      <p className="text-center text-gray-400 text-sm">
        Remembered your password?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
          Back to Login
        </Link>
      </p>

      {/* Success/Error Messages */}
      {successMsg && (
        <p className="text-center text-green-500 mt-3">{successMsg}</p>
      )}
      {errorMsg && (
        <p className="text-center text-red-500 mt-3">{errorMsg}</p>
      )}
    </form>
  );
};

export default ForgotPassword;
