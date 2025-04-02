import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product deleted successfully');
            getAllProductFunction();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete product');
        } finally {
            setLoading(false);
        }
    }

    const renderPrice = (product) => {
        if (product.offer && product.offer.isActive) {
            const currentDate = new Date();
            const validUntil = product.offer.validUntil ? new Date(product.offer.validUntil) : null;
            
            if (!validUntil || currentDate <= validUntil) {
                return (
                    <div className="flex items-center space-x-2">
                        <p className="text-xl font-bold text-green-600">
                            ৳{product.offer.discountedPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                            ৳{product.price}
                        </p>
                        <span className="text-sm font-semibold text-red-500">
                            -{product.offer.discountPercentage}%
                        </span>
                    </div>
                );
            }
        }
        return <p className="text-xl font-bold text-green-600">৳{product.price}</p>;
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link to={'/addproduct'}>
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                                     transition-colors duration-200 shadow-sm hover:shadow-md">
                        <FaPlus className="mr-2" />
                        Add Product
                    </button>
                </Link>
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
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Image</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Title</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Price</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Category</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Date</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllProduct.map((item, index) => {
                                    const { id, title, price, category, date, productImageUrl, offer } = item;
                                    return (
                                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 text-sm text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
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
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600 max-w-[200px]">
                                                <p className="truncate" title={title}>{title}</p>
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-800">
                                                {renderPrice(item)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                    {category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600">
                                                {date}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-3">
                                                    <button
                                                        onClick={() => navigate(`/updateproduct/${id}`)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Product"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Product"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {getAllProduct.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-1 text-gray-500">Get started by creating a new product.</p>
                            <div className="mt-6">
                                <Link to="/addproduct">
                                    <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        <FaPlus className="mr-2" />
                                        Add Product
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;