import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import { FaImage, FaBox, FaDollarSign, FaTags, FaFileAlt } from 'react-icons/fa';

const categoryList = [
    { name: 'Face Care' },
    { name: 'Body Care' },
    { name: 'Hair Care' },
    { name: 'Essential Oils' },
    { name: 'Herbal' },
    { name: 'Aromatherapy' },
    { name: 'Wellness' },
    { name: 'Gift Sets' }
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        shippingCost: "0",
        offer: {
            isActive: false,
            discountPercentage: 0,
            discountedPrice: 0,
            validUntil: ""
        },
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const productData = {
                ...product,
                price: parseFloat(product.price),
                shippingCost: parseFloat(product.shippingCost || 0),
                offer: {
                    ...product.offer,
                    discountPercentage: parseFloat(product.offer.discountPercentage),
                    discountedPrice: product.offer.isActive ? 
                        parseFloat(product.price) * (1 - parseFloat(product.offer.discountPercentage) / 100) : 
                        0
                },
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            };

            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, productData);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading && <Loader />}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                            Add New Product
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

                            {/* Price and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FaDollarSign className="mr-2" />
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter price"
                                    />
                                </div>

                                {/* Shipping Cost */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <FaDollarSign className="mr-2" />
                                        Shipping Cost
                                    </label>
                                    <input
                                        type="number"
                                        name="shippingCost"
                                        value={product.shippingCost}
                                        onChange={(e) => setProduct({ ...product, shippingCost: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter shipping cost"
                                    />
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

                            {/* Offer */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    Offer
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={product.offer.isActive}
                                        onChange={(e) => setProduct({ ...product, offer: { ...product.offer, isActive: e.target.checked } })}
                                        className="w-4 h-4"
                                    />
                                    <span>Active</span>
                                </div>
                                {product.offer.isActive && (
                                    <div className="mt-2">
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            Discount Percentage
                                        </label>
                                        <input
                                            type="number"
                                            value={product.offer.discountPercentage}
                                            onChange={(e) => setProduct({ ...product, offer: { ...product.offer, discountPercentage: e.target.value } })}
                                            placeholder="Enter discount percentage"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={addProductFunction}
                                    disabled={loading}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Adding Product...' : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;