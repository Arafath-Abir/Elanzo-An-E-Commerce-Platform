import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const logout = () => {
        localStorage.clear('users');
        toast.success("Logged out successfully");
        navigate("/login");
    }

    const navList = (
        <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 text-white font-medium text-md">
            <li className="hover:text-green-200 transition-colors">
                <Link to={'/'}>Home</Link>
            </li>
            <li className="hover:text-green-200 transition-colors">
                <Link to={'/allproduct'}>All Products</Link>
            </li>
            {!user && (
                <>
                    <li className="hover:text-green-200 transition-colors">
                        <Link to={'/signup'}>Sign up</Link>
                    </li>
                    <li className="hover:text-green-200 transition-colors">
                        <Link to={'/login'}>Sign in</Link>
                    </li>
                </>
            )}
            {user?.role === "user" && (
                <li className="hover:text-green-200 transition-colors">
                    <Link to={'/user-dashboard'}>User Dashboard</Link>
                </li>
            )}
            {user?.role === "admin" && (
                <li className="hover:text-green-200 transition-colors">
                    <Link to={'/admin-dashboard'}>Admin Dashboard</Link>
                </li>
            )}
            {user && (
                <li className="relative">
                    <button 
                        onClick={() => setShowLogoutConfirm(true)}
                        className="hover:text-green-200 transition-colors focus:outline-none"
                    >
                        Logout
                    </button>
                    
                    {/* Logout Confirmation Modal */}
                    {showLogoutConfirm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 relative animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Confirm Logout
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to log out of your account?
                                </p>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                                                 transition-colors duration-200"
                                    >
                                        Yes, Logout
                                    </button>
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                                                 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            )}
            <li className="hover:text-green-200 transition-colors relative">
                <Link to={'/cart'} className="flex items-center">
                    Cart
                    <span className="ml-1 bg-green-200 text-green-800 rounded-full px-2 py-0.5 text-xs">
                        {cartItems.length}
                    </span>
                </Link>
            </li>
        </ul>
    )

    return (
        <nav className="bg-gradient-to-r from-green-600 to-green-800 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between items-center py-4 px-6 space-y-4 lg:space-y-0">
                    <div className="flex items-center">
                        <Link to={'/'} className="transform hover:scale-105 transition-transform">
                            <h2 className="font-bold text-white text-2xl">Organica<span className="text-green-200">Hub</span></h2>
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 w-full lg:w-auto">
                        <div className="w-full lg:w-auto order-2 lg:order-1">
                            {navList}
                        </div>
                        <div className="w-full lg:w-auto order-1 lg:order-2">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;