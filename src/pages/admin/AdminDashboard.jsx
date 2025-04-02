import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import { useContext } from 'react';
import myContext from '../../context/myContext';
import Navbar from '../../components/navbar/Navbar';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Navbar */}
            <Navbar />

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Top */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-400/10 to-green-500/10 p-6 rounded-xl border border-green-500/10 shadow-sm">
                        <h1 className="text-center text-2xl font-bold text-green-800">Admin/Seller Dashboard</h1>
                    </div>
                </div>

                {/* Admin Profile Card */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="relative h-32 bg-gradient-to-r from-green-400 to-green-500">
                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" 
                                        alt="Admin" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-16 pb-6 px-4">
                            <div className="text-center space-y-1">
                                <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'Admin User'}</h2>
                                <p className="text-green-600 font-medium">{user?.role || 'Administrator'}</p>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                                <p className="text-gray-400 text-sm">Joined: {user?.date}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats and Tabs */}
                <div className="space-y-8">
                    <Tabs>
                        <TabList className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {/* Total Products */}
                            <Tab className="outline-none">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m5 11 4-7" />
                                                <path d="m19 11-4-7" />
                                                <path d="M2 11h20" />
                                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                                <path d="m9 11 1 9" />
                                                <path d="M4.5 15.5h15" />
                                                <path d="m15 11-1 9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 font-medium">Total Products</p>
                                            <h3 className="text-2xl font-bold text-gray-800">{getAllProduct.length}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Total Orders */}
                            <Tab className="outline-none">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1={10} x2={21} y1={6} y2={6} />
                                                <line x1={10} x2={21} y1={12} y2={12} />
                                                <line x1={10} x2={21} y1={18} y2={18} />
                                                <path d="M4 6h1v4" />
                                                <path d="M4 10h2" />
                                                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 font-medium">Total Orders</p>
                                            <h3 className="text-2xl font-bold text-gray-800">{getAllOrder.length}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Total Users */}
                            <Tab className="outline-none">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 text-green-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx={9} cy={7} r={4} />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 font-medium">Total Users</p>
                                            <h3 className="text-2xl font-bold text-gray-800">{getAllUser.length}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </TabList>

                        {/* Tab Panels */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <TabPanel>
                                <ProductDetail />
                            </TabPanel>

                            <TabPanel>
                                <OrderDetail />
                            </TabPanel>

                            <TabPanel>
                                <UserDetail />
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;