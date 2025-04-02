/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All fields are required");
            return;
        }

        if (userSignup.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            }

            const userRefrence = collection(fireDB, "user");
            await addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Account created successfully!");
            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already registered');
            } else {
                toast.error('Failed to create account');
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
            {/* Navbar */}
            <Navbar />

            {/* Signup Form */}
            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                {loading && <Loader />}

                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Join OrganicaHub and start shopping organic
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        value={userSignup.name}
                                        onChange={(e) => setUserSignup({...userSignup, name: e.target.value})}
                                        className="appearance-none relative block w-full px-4 py-3 border border-gray-200 
                                                 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none
                                                 focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                                                 transition-colors duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={userSignup.email}
                                        onChange={(e) => setUserSignup({...userSignup, email: e.target.value})}
                                        className="appearance-none relative block w-full px-4 py-3 border border-gray-200 
                                                 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none
                                                 focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                                                 transition-colors duration-200"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={userSignup.password}
                                        onChange={(e) => setUserSignup({...userSignup, password: e.target.value})}
                                        className="appearance-none relative block w-full px-4 py-3 border border-gray-200 
                                                 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none
                                                 focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                                                 transition-colors duration-200"
                                        placeholder="Create a password"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Must be at least 6 characters long
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={userSignupFunction}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                                         text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 
                                         to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none 
                                         focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform 
                                         transition-all duration-200 hover:scale-[1.02]"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <span className="text-gray-500">Already have an account?</span>{" "}
                                <Link 
                                    to="/login" 
                                    className="font-medium text-green-600 hover:text-green-700 transition-colors"
                                >
                                    Sign in
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

export default Signup;