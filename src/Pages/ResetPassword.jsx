import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../services/authApi";

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await resetPassword({ token, ...form }).unwrap();
      setSuccessMsg(res.data?.message || "Password has been reset successfully.");
      setForm({ password: "", confirmPassword: "" });

      // Redirect to login after a short delay
      setTimeout(() => navigate("/login",{replace:true}), 3000);
    } catch (err) {
      setErrorMsg(err?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-white">Reset Password</h2>
      <p className="text-gray-400 text-center text-sm">
        Enter your new password below.
      </p>

      {/* New Password */}
      <input
        type="password"
        placeholder="New Password"
        value={form.password}
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        required
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        className="w-full px-4 py-3 bg-gray-800/70 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>

      {/* Back to login */}
      <p className="text-center text-gray-400 text-sm">
        Remembered your password?{" "}
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

export default ResetPassword;
