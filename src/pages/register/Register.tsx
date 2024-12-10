import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useRegisterMutation } from "../../redux/features/api/endPoints/userEndpoint/userEndpoint";
import { MoonLoader } from "react-spinners";

export default function Register() {
    useTitle("Register");
    const navigate = useNavigate();
    const location = useLocation();
    const [register, { data, error, isLoading }] = useRegisterMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // handle profile picture
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfilePicture(file);
    };

    // Submit form data
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture as File);

        register(formData);
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
                <h2 className="text-2xl font-bold text-center text-[#FE0016] mb-6">
                    User Registration
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                    {/* Name */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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

                    {/* Profile Picture */}
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="profilePicture"
                        >
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    {/* Password */}
                    <div className="mb-4">
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

                    {/* Confirm Password */}
                    <div className="mb-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                'Register'
                        }
                    </button>
                </form>

                {/* Error message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}

                {/* Login link */}
                <div className='mt-4 text-center'>
                    <p className='text-sm'>
                        Already have an account?
                        <Link to="/login" className='text-blue-600 hover:underline ml-1'>
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
