import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { AlertCircle } from 'lucide-react';

const PaymentCancel = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto my-16 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Payment Cancelled</h1>
                    <p className="text-lg text-gray-600 mt-2">You've cancelled the payment process.</p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Your order has not been completed.</li>
                        <li>No payment has been processed.</li>
                        <li>Your items are still in your cart if you wish to complete the purchase later.</li>
                    </ul>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/cart"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                    >
                        Return to Cart
                    </Link>
                    <Link 
                        to="/"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentCancel; 