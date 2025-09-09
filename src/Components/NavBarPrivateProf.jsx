import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import {useLogoutMutation} from "../services/authApi.js";
import { clearUser } from "../features/authSlice.js";
import { useState, useRef, useEffect } from "react";

function NavbarPrivateProf() {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [logout] = useLogoutMutation();

    const avatarUrl = user
        ? `${import.meta.env.VITE_SERVER_URL}${user.avatar}?v=${user.avatarVersion || ''}`
        : '/default_avatar.png';


    async function handleLogout() {
      try {
          await logout().unwrap();
          dispatch(clearUser());
          navigate('/',{replace:true})
      } catch (err) {
          console.error(err)
      }
    }

    useEffect(() => {
      function handleClickOutside(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <nav className="w-full bg-transparent absolute z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Logo
        </Link>

        {
            user === null ? (
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 border font-semibold border-white text-white rounded-lg hover:bg-red-400 hover:text-white duration-300"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-4 py-2 bg-red-400 font-semibold text-white rounded-lg hover:bg-gray-700 duration-300"
                    >
                        Sign Up
                    </Link>
                </div>
            ):
            (
              <div ref={dropdownRef} className="relative">
                  {/* Avatar */}
                  <div
                    className="w-[40px] h-[40px] bg-gray-600 rounded-full border-2 border-red-500 cursor-pointer flex items-center justify-center overflow-hidden"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                      <img key={avatarUrl} src={avatarUrl} alt={user?.name} />
                  </div>
      
                  {/* Dropdown Menu */}
                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                        <Link
                          to={`/${user.username}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to={`/update-profile/${user.username}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setOpen(false)}
                        >
                          Update Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        >
                          Log Out
                        </button>
                    </div>
                  )}
              </div>
            )
        }
      </div>
    </nav>
  )
}

export default NavbarPrivateProf
