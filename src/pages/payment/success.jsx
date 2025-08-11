import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { clearCart } from '../../redux/cartSlice';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        // Get transaction details from URL query params
        const params = new URLSearchParams(location.search);
        const transactionData = {
            status: params.get('status'),
            transactionId: params.get('tran_id'),
            amount: params.get('amount'),
            currency: params.get('currency')
        };
        
        setTransactionDetails(transactionData);
        
        // Clear the cart after successful payment
        if (transactionData.status === 'VALID') {
            dispatch(clearCart());
            localStorage.removeItem('cart');
        }
    }, [dispatch, location.search]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto my-16 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 mt-2">Thank you for your purchase.</p>
                </div>

                {transactionDetails && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
                        <div className="space-y-2">
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium">{transactionDetails.status}</span>
                            </p>
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Transaction ID:</span>
                                <span className="font-medium">{transactionDetails.transactionId}</span>
                            </p>
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">{transactionDetails.currency} {transactionDetails.amount}</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-10 text-center">
                    <Link 
                        to="/"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentSuccess; 