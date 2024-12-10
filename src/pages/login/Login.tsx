import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useLoginMutation } from "../../redux/features/api/endPoints/userEndpoint/userEndpoint";
import { MoonLoader } from "react-spinners";

export default function Login() {
    useTitle("Login");
    const navigate = useNavigate();
    const location = useLocation();
    const [login, { data, error, isLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Submit form data
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        login({ email, password });
    };

    useEffect(() => {
        if (data) {
            navigate(location.state?.from?.pathname || "/", { replace: true });
        }

        if (error) {
            if ("status" in error) {
                const errMsgJSONString =
                    "error" in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [data, error, navigate, location.state?.from?.pathname]);

    return (
        <div className="mx-5 mt-20 mb-5">
            <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-[#000] mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                    {/* Email */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#333] text-white py-2 rounded hover:bg-[#000] duration-300"
                        disabled={isLoading}
                    >
                        {
                            isLoading ?
                                <div className='flex justify-center px-4'><MoonLoader color="#fff" size={18} /> </div> :
                                'Login'
                        }
                    </button>
                </form>

                {/* Error message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}

                {/* Register link */}
                <div className='mt-4 text-center'>
                    <p className='text-sm'>
                        Don't have an account?
                        <Link to="/register" className='text-blue-600 hover:underline ml-1'>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
