import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Close mobile menu when navigating or resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 600) {
                setMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logout = () => {
        localStorage.clear('users');
        toast.success("Logged out successfully");
        navigate("/login");
    }

    const navList = (
        <ul className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-6 text-white font-medium text-md">
            <li className="hover:text-green-200 transition-colors">
                <Link to={'/'} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="hover:text-green-200 transition-colors">
                <Link to={'/allproduct'} onClick={() => setMobileMenuOpen(false)}>All Products</Link>
            </li>
            {!user && (
                <>
                    <li className="hover:text-green-200 transition-colors">
                        <Link to={'/signup'} onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                    </li>
                    <li className="hover:text-green-200 transition-colors">
                        <Link to={'/login'} onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
                    </li>
                </>
            )}
            {user?.role === "user" && (
                <li className="hover:text-green-200 transition-colors">
                    <Link to={'/user-dashboard'} onClick={() => setMobileMenuOpen(false)}>User Dashboard</Link>
                </li>
            )}
            {user?.role === "admin" && (
                <li className="hover:text-green-200 transition-colors">
                    <Link to={'/admin-dashboard'} onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                </li>
            )}
            {user && (
                <li className="relative">
                    <button 
                        onClick={() => {
                            setMobileMenuOpen(false);
                            setShowLogoutConfirm(true);
                        }}
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
                <Link to={'/cart'} onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                    Cart
                    <span className="ml-1 bg-green-200 text-green-800 rounded-full px-2 py-0.5 text-xs">
                        {cartItems.length}
                    </span>
                </Link>
            </li>
        </ul>
    )

    // Hamburger menu icon component
    const HamburgerIcon = ({ isOpen, onClick }) => (
        <button 
            className="lg:hidden text-white focus:outline-none" 
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            <div className="w-6 flex flex-col items-end justify-center space-y-1.5 relative">
                <span 
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-6 transform rotate-45 translate-y-2' : 'w-6'}`}
                ></span>
                <span 
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4 opacity-100'}`}
                ></span>
                <span 
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'w-6 transform -rotate-45 -translate-y-2' : 'w-5'}`}
                ></span>
            </div>
        </button>
    );

    return (
        <nav className="bg-gradient-to-r from-green-600 to-green-800 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between items-center py-4 px-6 space-y-4 lg:space-y-0">
                    {/* Logo and hamburger section */}
                    <div className="flex justify-between items-center w-full lg:w-auto">
                        <Link to={'/'} className="transform hover:scale-105 transition-transform">
                            <h2 className="font-bold text-white text-2xl">Organica<span className="text-green-200">Hub</span></h2>
                        </Link>
                        
                        <HamburgerIcon 
                            isOpen={mobileMenuOpen} 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        />
                    </div>

                    {/* Mobile and desktop menu */}
                    <div className={`${mobileMenuOpen ? 'flex' : 'hidden lg:flex'} flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 w-full lg:w-auto transition-all duration-300 ease-in-out`}>
                        <div className="w-full lg:w-auto order-2 lg:order-1 py-4 lg:py-0">
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