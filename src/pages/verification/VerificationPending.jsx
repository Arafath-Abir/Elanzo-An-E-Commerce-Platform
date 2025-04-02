import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const VerificationPending = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else if (user.emailVerified) {
                toast.success('Email verified successfully!');
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleCodeChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple digits
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
                const newCode = [...verificationCode];
                newCode[index - 1] = '';
                setVerificationCode(newCode);
            }
        }
    };

    const handleVerifyCode = async () => {
        const code = verificationCode.join('');
        if (code.length !== 6) {
            toast.error('Please enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                // Query Firestore to get the user document
                const userQuery = query(
                    collection(fireDB, "user"),
                    where("uid", "==", user.uid)
                );
                
                const querySnapshot = await getDocs(userQuery);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();

                    if (userData.verificationCode === code) {
                        // Update user document to mark email as verified
                        await updateDoc(doc(fireDB, "user", userDoc.id), {
                            emailVerified: true,
                            verificationCode: null // Clear the verification code
                        });

                        toast.success('Email verified successfully!');
                        navigate('/');
                    } else {
                        toast.error('Invalid verification code');
                    }
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Error verifying code. Please try again.');
        }
        setLoading(false);
    };

    const handleResendVerification = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                // Generate new verification code
                const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                
                // Update the code in Firestore
                const userQuery = query(
                    collection(fireDB, "user"),
                    where("uid", "==", user.uid)
                );
                
                const querySnapshot = await getDocs(userQuery);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    await updateDoc(doc(fireDB, "user", userDoc.id), {
                        verificationCode: newCode
                    });
                    
                    // In a real application, send this code via email
                    // For demo purposes, show it in a toast
                    toast.success(`New verification code: ${newCode}`);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Error sending new code. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
            <Navbar />
            
            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Verify Your Email
                        </h2>
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                We've sent a verification code to your email. Please enter the 6-digit code below.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-center space-x-2">
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleVerifyCode}
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={handleResendVerification}
                            className="text-sm text-green-600 hover:text-green-500"
                        >
                            Didn't receive the code? Send again
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VerificationPending;
