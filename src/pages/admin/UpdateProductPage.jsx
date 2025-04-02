import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { FaImage, FaBox, FaDollarSign, FaTags, FaFileAlt } from 'react-icons/fa';

const categoryList = [
    { name: 'Face Care' },
    { name: 'Body Care' },
    { name: 'Skincare' },
    { name: 'Hair Care' },
    { name: 'Essential Oils' },
    { name: 'Herbal' },
    { name: 'Aromatherapy' },
    { name: 'Wellness' },
    { name: 'Gift Sets' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const productData = productTemp.data();
            setProduct({
                title: productData?.title || "",
                price: productData?.price || "",
                productImageUrl: productData?.productImageUrl || "",
                category: productData?.category || "",
                description: productData?.description || "",
                quantity: productData?.quantity || 1,
                time: productData?.time || Timestamp.now(),
                date: productData?.date || new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    }

    const updateProduct = async () => {
        if (!product.title || !product.price || !product.productImageUrl || !product.category || !product.description) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product updated successfully");
            getAllProductFunction();
            navigate('/admin-dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading && <Loader />}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                            Update Product
                        </h2>

                        <div className="space-y-6">
                            {/* Product Title */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaBox className="w-4 h-4 mr-2 text-gray-400" />
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                    placeholder="Enter product title"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaDollarSign className="w-4 h-4 mr-2 text-gray-400" />
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                    placeholder="Enter price"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaImage className="w-4 h-4 mr-2 text-gray-400" />
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={product.productImageUrl}
                                    onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                                    placeholder="Enter image URL"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                />
                                {product.productImageUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={product.productImageUrl}
                                            alt="Product preview"
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/150?text=Invalid+URL";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaTags className="w-4 h-4 mr-2 text-gray-400" />
                                    Category
                                </label>
                                <select
                                    value={product.category}
                                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                >
                                    <option value="">Select a category</option>
                                    {categoryList.map(({ name }, index) => (
                                        <option key={index} value={name} className="capitalize">
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaFileAlt className="w-4 h-4 mr-2 text-gray-400" />
                                    Description
                                </label>
                                <textarea
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    placeholder="Enter product description"
                                    rows="5"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={updateProduct}
                                    disabled={loading}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Updating Product...' : 'Update Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;