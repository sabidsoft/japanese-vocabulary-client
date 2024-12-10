import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    // handling logout
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate('/');
    }

    const goToHomePage = () => {
        navigate('/');
    }

    return (
        <div className="sticky top-0 flex justify-between items-center px-24 py-5 shadow">
            <h3
                onClick={goToHomePage}
                className="text-2xl font-bold cursor-pointer"
            >
                Japanese Vocabulary
            </h3>
            {
                auth.token && auth.user &&
                <button
                    onClick={logout}
                    className="bg-[#840808] hover:bg-[#460808] duration-300 px-4 py-1.5 rounded text-[#E4E6EB]"
                >
                    Logout
                </button>
            }
        </div>
    );
}
