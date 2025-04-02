import { useContext } from "react";
import myContext from "../../context/myContext";
import { FaTrash } from 'react-icons/fa';
import Loader from "../loader/Loader";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct, loading, updateOrderStatus } = context;

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="min-w-[1200px]">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">S.No.</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Order ID</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Product</th>
                                        <th className="mr-10 py-4 px-9 text-left text-sm font-semibold text-gray-600">Category</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Price</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Quantity</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Total</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Status</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Customer</th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAllOrder.map((order) => (
                                        order.cartItems.map((item, index) => {
                                            const { id, productImageUrl, title, category, price, quantity } = item;
                                            return (
                                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-4 px-6 text-sm text-gray-600">
                                                        {index + 1}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-gray-600">
                                                        <span className="font-mono">{id.slice(0, 8)}...</span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                                <img 
                                                                    className="w-full h-full object-cover" 
                                                                    src={productImageUrl} 
                                                                    alt={title}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate" title={title}>
                                                                    {title}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                            {category}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                                        ৳{price}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-gray-600">
                                                        {quantity}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                                        ৳{price * quantity}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                            className="px-3 py-1 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="delivered">Delivered</option>
                                                        </select>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="text-sm">
                                                            <p className="font-medium text-gray-900">{order.addressInfo.name}</p>
                                                            <p className="text-gray-500 truncate" title={order.addressInfo.address}>
                                                                {order.addressInfo.address}
                                                            </p>
                                                            <p className="text-gray-500">{order.addressInfo.mobileNumber}</p>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <button
                                                            onClick={() => deleteProduct(order.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Order"
                                                        >
                                                            <FaTrash className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {getAllOrder.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                            <p className="mt-1 text-gray-500">Orders will appear here when customers make purchases.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderDetail;