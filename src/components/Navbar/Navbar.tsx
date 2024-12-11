import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import brandLogo from "../../assets/images/brand_logo.png";

const mobileNavigationMenuClassName =
  "font-medium text-lg text-center py-3 duration-300";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  // Check for Admin Role
  const isAdmin = user?.role === "Admin";

  // Handling logout
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/login");
  };

  // Function to determine active class
  const isActive = (path: string) =>
    location.pathname === path ? "text-[#FE0016]" : "text-gray-600";

  return (
    <nav className="sticky top-0 z-50 shadow bg-[#fff]">
      {/* Desktop Navigation */}
      <div className="bg-gray-100">
        <div className="w-[100%] lg:w-[80%] mx-auto hidden lg:flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={brandLogo} alt="Brand_Logo" width={80} height={80} />
            <p className="text-gray-600 font-bold text-2xl ml-4">
              Japanese Vocabulary School
            </p>
          </Link>

          {user ? (
            <div className="flex justify-center items-center">
              <Link
                to="/lessons"
                className={`${isActive(
                  "/lessons"
                )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
              >
                Lessons
              </Link>
              <Link
                to="/tutorials"
                className={`${isActive(
                  "/tutorials"
                )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
              >
                Tutorials
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/dashboard"
                    className={`${isActive(
                      "/dashboard"
                    )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-lessons"
                    className={`${isActive(
                      "/add-lessons"
                    )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
                  >
                    Add Lessons
                  </Link>
                  <Link
                    to="/manage-users"
                    className={`${isActive(
                      "/manage-users"
                    )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
                  >
                    Manage Users
                  </Link>
                </>
              )}
              <div className="flex items-center ml-8">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2 border border-gray-300"
                  />
                )}
                <button
                  onClick={logout}
                  className="text-white bg-gray-600 hover:bg-[#000] duration-500 font-medium text-lg rounded-full px-4 py-1"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                to="/login"
                className={`${isActive(
                  "/login"
                )} font-medium text-lg mr-5 hover:text-[#FE0016]`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${isActive(
                  "/register"
                )} font-medium text-lg hover:text-[#FE0016]`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile and Tab Navigation */}
      <div className="lg:hidden bg-gray-100 pb-5">
        <div className="flex justify-between items-center px-4 py-4">
          <Link to="/" className="flex items-center">
            <img src={brandLogo} alt="Brand_Logo" width={36} height={36} />
            <p className="text-gray-600 font-bold text-3xl ml-2">
              Japanese Vocabulary
            </p>
          </Link>

          {isMenuOpen ? (
            <RxCross2
              size={30}
              color="bg-gray-600"
              cursor="pointer"
              onClick={() => setIsMenuOpen((prevState) => !prevState)}
            />
          ) : (
            <BiMenu
              size={30}
              color="bg-gray-600"
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
                className={`${mobileNavigationMenuClassName} ${isActive(
                  "/lessons"
                )} hover:text-[#FE0016]`}
              >
                Lessons
              </Link>
              <Link
                to="/tutorials"
                onClick={() => setIsMenuOpen(false)}
                className={`${mobileNavigationMenuClassName} ${isActive(
                  "/tutorials"
                )} hover:text-[#FE0016]`}
              >
                Tutorials
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${mobileNavigationMenuClassName} ${isActive(
                      "/dashboard"
                    )} hover:text-[#FE0016]`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-lessons"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${mobileNavigationMenuClassName} ${isActive(
                      "/add-lessons"
                    )} hover:text-[#FE0016]`}
                  >
                    Add Lessons
                  </Link>
                  <Link
                    to="/manage-users"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${mobileNavigationMenuClassName} ${isActive(
                      "/manage-users"
                    )} hover:text-[#FE0016]`}
                  >
                    Manage Users
                  </Link>
                </>
              )}
              <div className="flex justify-center items-center mt-5">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2 border border-gray-300"
                  />
                )}
                <button
                  onClick={logout}
                  className="text-white bg-gray-600 hover:bg-[#000] duration-500 font-medium text-lg rounded-full px-4 py-1"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`${mobileNavigationMenuClassName} ${isActive(
                  "/login"
                )} hover:text-[#FE0016]`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`${mobileNavigationMenuClassName} ${isActive(
                  "/register"
                )} hover:text-[#FE0016]`}
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
