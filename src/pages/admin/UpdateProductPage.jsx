import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { FaImage, FaBox, FaDollarSign, FaTags, FaFileAlt, FaWarehouse } from 'react-icons/fa';

const categoryList = [
    { name: "Men's Fashion" },
    { name: "Women's Fashion" },
    { name: "Kids & Baby" },
    { name: "Modest Wear" },
    { name: "Ethnic & Traditional" },
    { name: "Dresses" },
    { name: "Tops & Shirts" },
    { name: "Jeans & Trousers" },
    { name: "Outerwear & Jackets" },
    { name: "Activewear" },
    { name: "Loungewear & Sleepwear" },
    { name: "Footwear" },
    { name: "Bags & Backpacks" },
    { name: "Accessories" },
    { name: "Jewelry & Watches" },
    { name: "Seasonal & Occasion" }
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
        shippingCost: "0",
        quantity: 0,
        offer: {
            isActive: false,
            discountPercentage: 0,
            discountedPrice: 0,
            validUntil: ""
        }
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
                shippingCost: productData?.shippingCost || "0",
                quantity: productData?.quantity || 0,
                offer: productData?.offer || {
                    isActive: false,
                    discountPercentage: 0,
                    discountedPrice: 0,
                    validUntil: ""
                }
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    }

    const updateProduct = async () => {
        setLoading(true);
        try {
            const productData = {
                ...product,
                price: parseFloat(product.price),
                shippingCost: parseFloat(product.shippingCost || 0),
                offer: {
                    ...product.offer,
                    discountPercentage: parseFloat(product.offer.discountPercentage || 0),
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

            await setDoc(doc(fireDB, "products", id), productData);
            toast.success("Product Updated Successfully");
            getAllProductFunction();
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to update product");
        }
    }

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading && <Loader />}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                            Update Product
                        </h2>

                        <div className="space-y-6">
                            {/* Product Title */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    <FaBox className="w-4 h-4 mr-2 text-gray-400" />
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                    placeholder="Enter product title"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                />
                            </div>

                            {/* Price, Stock, and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Price */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        <FaDollarSign className="mr-2" />
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                                        placeholder="Enter price"
                                    />
                                </div>
                                
                                {/* Stock Quantity */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        <FaWarehouse className="mr-2" />
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        min="0"
                                        value={product.quantity}
                                        onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                                        placeholder="Available stock"
                                    />
                                </div>

                                {/* Shipping Cost */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        <FaDollarSign className="mr-2" />
                                        Shipping Cost
                                    </label>
                                    <input
                                        type="number"
                                        name="shippingCost"
                                        value={product.shippingCost}
                                        onChange={(e) => setProduct({ ...product, shippingCost: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                                        placeholder="Enter shipping cost"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        <FaTags className="w-4 h-4 mr-2 text-gray-400" />
                                        Category
                                    </label>
                                    <select
                                        value={product.category}
                                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
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
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    <FaImage className="w-4 h-4 mr-2 text-gray-400" />
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={product.productImageUrl}
                                    onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                                    placeholder="Enter image URL"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
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
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    <FaFileAlt className="w-4 h-4 mr-2 text-gray-400" />
                                    Description
                                </label>
                                <textarea
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    placeholder="Enter product description"
                                    rows="5"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Offer */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    Offer
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={product.offer.isActive}
                                        onChange={(e) => setProduct({ ...product, offer: { ...product.offer, isActive: e.target.checked } })}
                                        className="w-4 h-4"
                                    />
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Is Active</label>
                                </div>
                                <div className="mt-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        Discount Percentage
                                    </label>
                                    <input
                                        type="number"
                                        value={product.offer.discountPercentage}
                                        onChange={(e) => setProduct({ ...product, offer: { ...product.offer, discountPercentage: e.target.value } })}
                                        placeholder="Enter discount percentage"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                        Valid Until
                                    </label>
                                    <input
                                        type="date"
                                        value={product.offer.validUntil}
                                        onChange={(e) => setProduct({ ...product, offer: { ...product.offer, validUntil: e.target.value } })}
                                        placeholder="Enter valid until date"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={updateProduct}
                                    disabled={loading}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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