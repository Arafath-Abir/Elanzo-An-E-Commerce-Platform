/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // Dark Mode State
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage and system preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return savedMode === 'true';
        }
        // If no saved preference, check system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);

    /**========================================================================
     *                          GET All Product Function
     *========================================================================**/

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);


    /**========================================================================
     *                           GET All Order Function
     *========================================================================**/

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // Delete oder Function
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    // user State 
    const [getAllUser, setGetAllUser] = useState([]);


    /**========================================================================
     *                           GET All User Function
     *========================================================================**/

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Update Order Status Function
    const updateOrderStatus = async (orderId, newStatus) => {
        setLoading(true)
        try {
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, {
                status: newStatus
            });
            
            toast.success('Order status updated successfully');
            getAllOrderFunction(); // Refresh orders after update
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Failed to update order status');
            setLoading(false)
        }
    }

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    // Apply dark mode class to html element
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);
    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            deleteProduct,
            getAllUser,
            updateOrderStatus,
            darkMode,
            toggleDarkMode
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState