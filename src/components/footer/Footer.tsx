import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto py-16 px-4">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full sm:w-1/2 md:w-1/4 px-4">
                        <h3 className="text-[#48484A] text-xl font-semibold mb-8">Legal & Contact</h3>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Support</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Affiliates</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Privacy</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Terms</Link>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4  px-4">
                        <h3 className="text-[#48484A] text-xl font-semibold mb-8">Blog Categories</h3>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Trending Now</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Podcast</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Social Media</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>New Courses</Link>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4  px-4">
                        <h3 className="text-[#48484A] text-xl font-semibold mb-8">Site Links</h3>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Experts</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Team</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Blog</Link>
                        <Link to='#' className='text-[#74767e] hover:underline block mb-2'>Social Media</Link>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 px-4">
                        <h3 className="text-[#48484A] text-xl font-semibold mb-8">Social Media</h3>
                        <p className='text-[#74767e] block mb-2'>Connect</p>
                        <div className='flex items-center space-x-4'>
                            <Link
                                to='https://www.facebook.com/sabit.hasan.58'
                                target="_blank"
                                className='flex justify-center items-center w-8 h-8 rounded-full bg-[#FE0016] hover:bg-[#c53932] duration-500'
                            >
                                <FaFacebookF size={16} className='text-white' />
                            </Link>

                            <Link
                                to='https://www.linkedin.com/in/md-sabid-hasan/'
                                target="_blank"
                                className='flex justify-center items-center w-8 h-8 rounded-full bg-[#FE0016] hover:bg-[#c53932] duration-500'
                            >
                                <FaLinkedinIn size={16} className='text-white' />
                            </Link>

                            <Link
                                to='https://github.com/sabidsoft'
                                target="_blank"
                                className='flex justify-center items-center w-8 h-8 rounded-full bg-[#FE0016] hover:bg-[#c53932] duration-500'
                            >
                                <FaGithub size={16} className='text-white' />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className='text-center bg-gray-800'>
                <p className='text-[#fff] text-[14px] py-4'>
                    Copyright &copy; 2024 by Japanese Vocabulary School | All Rights Reserved
                </p>
            </div>
        </footer>
    );
}
