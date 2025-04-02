import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { FaUser, FaEnvelope, FaCalendar, FaUserTag } from 'react-icons/fa';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;
    const userOrders = getAllOrder.filter(order => order.userid === user?.uid);

    return (
        <Layout>
            <div className="container-custom animate-fade-in">
                {/* Profile Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 shadow-lg overflow-hidden p-6">
                        <div className="text-center space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-center space-x-2">
                                    <FaUser className="text-green-600 text-xl" />
                                    <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <FaEnvelope className="text-green-600" />
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <FaCalendar className="text-green-600" />
                                    <p className="text-gray-600">{user?.date}</p>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <FaUserTag className="text-green-600" />
                                    <span className="badge badge-success capitalize">{user?.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full mr-3"></span>
                        Order History
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader />
                        </div>
                    ) : userOrders.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <FaUser className="w-16 h-16 text-green-200 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                            <p className="text-gray-500">Your order history will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {userOrders.map((order) => (
                                <div key={order.id} className="card card-hover">
                                    {order.cartItems?.map((item, index) => {
                                        const { id, date, quantity, price, title, productImageUrl, category } = item;
                                        const { status } = order;
                                        return (
                                            <div key={index} className="flex flex-col md:flex-row">
                                                {/* Order Info */}
                                                <div className="w-full md:w-1/3 bg-gradient-to-br from-green-50 to-green-100 p-6 space-y-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Order ID</div>
                                                        <div className="font-semibold text-gray-800">#{id}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Date</div>
                                                        <div className="font-semibold text-gray-800">{date}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Total Amount</div>
                                                        <div className="font-semibold text-green-600">৳{price * quantity}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Status</div>
                                                        <span className={`badge ${
                                                            status === 'delivered' ? 'badge-success' : 'badge-warning'
                                                        } capitalize`}>
                                                            {status}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 p-6">
                                                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                                                        <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
                                                            <img
                                                                src={productImageUrl}
                                                                alt={title}
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="flex-1 space-y-4">
                                                            <div>
                                                                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                                                                <p className="text-gray-600">{category}</p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="text-sm text-gray-600">
                                                                    Quantity: <span className="font-semibold">{quantity}</span>
                                                                </div>
                                                                <div className="text-lg font-bold text-green-600">
                                                                    ৳{price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;