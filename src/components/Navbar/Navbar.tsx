import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import brandLogo from "../../assets/images/brand_logo.png";

const mobileNavigationMenuClassName =
  "text-[#FE0016] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  // Check for Admin Role
  const isAdmin = user?.role === "Admin";

  // Handling logout
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 shadow bg-[#fff]">
      {/* Desktop Navigation */}
      <div className="bg-gray-100">
        <div className="w-[100%] lg:w-[80%] mx-auto hidden lg:flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={brandLogo} alt="Brand_Logo" width={80} height={80} />
            <p className="text-[#FE0016] font-bold text-2xl ml-4">
              Japanese Vocabulary School
            </p>
          </Link>

          {user ? (
            <div className="flex justify-center items-center">
              <Link
                to="/lessons"
                className="text-[#FE0016] font-medium text-lg mr-5"
              >
                Lessons
              </Link>
              <Link
                to="/tutorials"
                className="text-[#FE0016] font-medium text-lg mr-5"
              >
                Tutorials
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-[#FE0016] font-medium text-lg mr-5"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-lessons"
                    className="text-[#FE0016] font-medium text-lg mr-5"
                  >
                    Add Lessons
                  </Link>
                  <Link
                    to="/manage-users"
                    className="text-[#FE0016] font-medium text-lg mr-5"
                  >
                    Manage Users
                  </Link>
                </>
              )}
              <button
                onClick={logout}
                className="text-white bg-[#FE0016] hover:bg-[#c53932] duration-300 font-medium text-lg rounded-full px-4 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                to="/login"
                className="text-[#FE0016] font-medium text-lg mr-5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-[#FE0016] font-medium text-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile and Tab Navigation */}
      <div className="lg:hidden bg-gray-100">
        <div className="flex justify-between items-center px-4 py-4">
          <Link to="/" className="flex items-center">
            <img src={brandLogo} alt="Brand_Logo" width={36} height={36} />
            <p className="text-[#FE0016] font-bold text-3xl ml-2">
              Vocabulary App
            </p>
          </Link>

          {isMenuOpen ? (
            <RxCross2
              size={30}
              color="#FE0016"
              cursor="pointer"
              onClick={() => setIsMenuOpen((prevState) => !prevState)}
            />
          ) : (
            <BiMenu
              size={30}
              color="#FE0016"
              cursor="pointer"
              onClick={() => setIsMenuOpen((prevState) => !prevState)}
            />
          )}
        </div>

        <div className={`${isMenuOpen ? "flex flex-col mt-4" : "hidden"}`}>
          {user ? (
            <>
              <Link
                to="/lessons"
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavigationMenuClassName}
              >
                Lessons
              </Link>
              <Link
                to="/tutorials"
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavigationMenuClassName}
              >
                Tutorials
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={mobileNavigationMenuClassName}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-lessons"
                    onClick={() => setIsMenuOpen(false)}
                    className={mobileNavigationMenuClassName}
                  >
                    Add Lessons
                  </Link>
                  <Link
                    to="/manage-users"
                    onClick={() => setIsMenuOpen(false)}
                    className={mobileNavigationMenuClassName}
                  >
                    Manage Users
                  </Link>
                </>
              )}
              <button
                onClick={logout}
                className="text-white bg-[#FE0016] hover:bg-[#c53932] duration-300 font-medium text-lg rounded-full px-4 py-1 mt-4 mx-auto"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavigationMenuClassName}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavigationMenuClassName}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
