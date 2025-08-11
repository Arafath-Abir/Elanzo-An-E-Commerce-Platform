/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, fireDB, googleProvider } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
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

    const signupWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user already exists
            const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            let userData = null;

            if (querySnapshot.empty) {
                // Create new user document
                const newUserData = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role: "user",
                    emailVerified: true,
                    time: Timestamp.now(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                };

                const docRef = await addDoc(collection(fireDB, "user"), newUserData);
                userData = { ...newUserData, id: docRef.id };
                toast.success("Account created successfully!");
                navigate('/user-dashboard', { replace: true });
            } else {
                // Get existing user data
                userData = { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id };
                toast.success("Welcome back!");
                
                // Navigate based on role
                if (userData.role === "admin") {
                    navigate('/admin-dashboard', { replace: true });
                } else {
                    navigate('/user-dashboard', { replace: true });
                }
            }

            // Store complete user data in localStorage
            localStorage.setItem('users', JSON.stringify(userData));
        } catch (error) {
            console.error("Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error("Sign up cancelled");
            } else {
                toast.error("Failed to sign up with Google");
            }
        } finally {
            setLoading(false);
        }
    };

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
            const userCredential = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
            
            // Send verification email
            await sendEmailVerification(userCredential.user);

            const userData = {
                name: userSignup.name,
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                role: "user",
                emailVerified: false,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };

            const docRef = await addDoc(collection(fireDB, "user"), userData);
            localStorage.setItem('users', JSON.stringify({ ...userData, id: docRef.id }));

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Account created! Please check your email to verify your account before signing in.");
            navigate('/login');
            setLoading(false);
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
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                {loading && <Loader />}

                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Join Elanzo and start shopping
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
                                        value={userSignup.name}
                                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={userSignup.email}
                                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        placeholder="Enter your email"
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
                                        value={userSignup.password}
                                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={userSignupFunction}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign up
                            </button>

                            <button
                                onClick={signupWithGoogle}
                                type="button"
                                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                Sign up with Google
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Signup;