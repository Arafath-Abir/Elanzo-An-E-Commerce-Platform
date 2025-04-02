/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, fireDB, googleProvider } from '../../firebase/FirebaseConfig';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Loader from '../../components/loader/Loader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user already exists in Firestore
            const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            let userData = null;

            if (querySnapshot.empty) {
                // Create new user document if it doesn't exist
                const newUserData = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role: "user",
                    emailVerified: true,
                    time: new Date(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                };

                const docRef = await addDoc(collection(fireDB, "user"), newUserData);
                userData = { ...newUserData, id: docRef.id };
            } else {
                // Get existing user data
                userData = { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id };
            }

            // Store complete user data in localStorage
            localStorage.setItem('users', JSON.stringify(userData));
            toast.success("Login successful!");

            // Navigate based on role
            if (userData.role === "admin") {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate('/user-dashboard', { replace: true });
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error("Login cancelled");
            } else {
                toast.error("Failed to login with Google");
            }
        } finally {
            setLoading(false);
        }
    };

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            
            // Check if email is verified
            if (!userCredential.user.emailVerified) {
                toast.error("Please verify your email before signing in. Check your inbox for the verification link.");
                setLoading(false);
                return;
            }

            // Get user data from Firestore
            const q = query(collection(fireDB, "user"), where("uid", "==", userCredential.user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id };
                localStorage.setItem('users', JSON.stringify(userData));

                setUserLogin({
                    email: "",
                    password: ""
                });

                toast.success("Login successful!");
                
                // Redirect based on role
                if (userData.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            } else {
                toast.error("User data not found");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                toast.error('Invalid email or password');
            } else {
                toast.error('Failed to login');
            }
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
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={userLogin.email}
                                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
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
                                        value={userLogin.password}
                                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={userLoginFunction}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign in
                            </button>

                            <button
                                onClick={loginWithGoogle}
                                type="button"
                                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                Sign in with Google
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                                Don't have an account? Sign up
                            </Link>
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