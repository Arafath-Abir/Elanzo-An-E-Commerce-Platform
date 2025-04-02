import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { XCircle } from 'lucide-react';

const PaymentFail = () => {
    const location = useLocation();
    const [errorDetails, setErrorDetails] = useState(null);

    useEffect(() => {
        // Get error details from URL query params
        const params = new URLSearchParams(location.search);
        const errorData = {
            status: params.get('status'),
            transactionId: params.get('tran_id'),
            errorMessage: params.get('error') || 'Transaction was not completed successfully.'
        };
        
        setErrorDetails(errorData);
    }, [location.search]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto my-16 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        We couldn't process your payment at this time.
                    </p>
                </div>

                {errorDetails && (
                    <div className="bg-red-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Error Details</h2>
                        <div className="space-y-2">
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium">{errorDetails.status}</span>
                            </p>
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Transaction ID:</span>
                                <span className="font-medium">{errorDetails.transactionId}</span>
                            </p>
                            <p className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Error Message:</span>
                                <span className="font-medium text-red-600">{errorDetails.errorMessage}</span>
                            </p>
                        </div>
                    </div>
                )}

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

export default PaymentFail; 