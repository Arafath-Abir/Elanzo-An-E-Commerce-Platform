import { useContext } from "react";
import myContext from "../../context/myContext";
import { FaUser } from 'react-icons/fa';
import Loader from "../loader/Loader";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser, loading } = context;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">S.No.</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">User</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Role</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUser.map((user, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <FaUser className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full 
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-mono text-gray-600" title={user.uid}>
                                                {user.uid.slice(0, 8)}...
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {user.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {getAllUser.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUser className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                            <p className="mt-1 text-gray-500">Users will appear here when they register.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserDetail;