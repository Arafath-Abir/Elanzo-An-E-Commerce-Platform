/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All fields are required")
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user))
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("Failed to fetch user data");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Invalid email or password");
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
            {/* Navbar */}
            <Navbar />

            {/* Login Form */}
            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                {loading && <Loader />}
                
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Sign in to your OrganicaHub account
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={userLogin.email}
                                        onChange={(e) => setUserLogin({...userLogin, email: e.target.value})}
                                        className="appearance-none relative block w-full px-4 py-3 border border-gray-200 
                                                 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none
                                                 focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                                                 transition-colors duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={userLogin.password}
                                        onChange={(e) => setUserLogin({...userLogin, password: e.target.value})}
                                        className="appearance-none relative block w-full px-4 py-3 border border-gray-200 
                                                 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none
                                                 focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                                                 transition-colors duration-200"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={userLoginFunction}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                                         text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 
                                         to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none 
                                         focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform 
                                         transition-all duration-200 hover:scale-[1.02]"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <span className="text-gray-500">Don't have an account?</span>{" "}
                                <Link 
                                    to="/signup" 
                                    className="font-medium text-green-600 hover:text-green-700 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Login;