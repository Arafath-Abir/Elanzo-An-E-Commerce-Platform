import { useState, useEffect } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify'
import { fireDB } from '../firebase/FirebaseConfig'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

function MyContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage and system preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return savedMode === 'true';
        }
        // If no saved preference, check system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // get all order function
    const getAllOrderFunction = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = []
            result.forEach((doc) => {
                ordersArray.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setGetAllOrder(ordersArray);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        setLoading(true)
        try {
            const orderRef = doc(fireDB, 'orders', orderId);
            await updateDoc(orderRef, {
                status: newStatus
            });
            
            // Update local state
            setGetAllOrder(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: newStatus }
                        : order
                )
            );
            
            toast.success('Order status updated successfully');
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
        getAllOrderFunction();
    }, []);

    return (
        <MyContext.Provider value={{ 
            loading, 
            setLoading,
            getAllOrder,
            getAllOrderFunction,
            updateOrderStatus,
            darkMode,
            toggleDarkMode
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider