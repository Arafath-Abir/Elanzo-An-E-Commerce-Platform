import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const auth = getAuth();
    const user = auth.currentUser;

    const [product, setProduct] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const { id } = useParams();

    // getProductData
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to submit a review");
            return;
        }

        try {
            const productRef = doc(fireDB, "products", id);
            await updateDoc(productRef, {
                reviews: arrayUnion({
                    userId: user.uid,
                    userName: user.displayName || user.email,
                    rating: rating,
                    comment: review,
                    timestamp: Timestamp.now()
                })
            });

            toast.success("Review submitted successfully");
            setReview('');
            setRating(5);
            setShowReviewForm(false);
            getProductData(); // Refresh product data to show new review
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review");
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        getProductData();
    }, [])

    const renderStars = (count) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ${index < count ? 'text-yellow-400' : 'text-gray-300'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const renderPrice = () => {
        if (product.offer && product.offer.isActive) {
            const currentDate = new Date();
            const validUntil = product.offer.validUntil ? new Date(product.offer.validUntil) : null;
            
            if (!validUntil || currentDate <= validUntil) {
                return (
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                            <p className="text-3xl font-bold text-green-600">
                                ৳{product.offer.discountedPrice.toFixed(2)}
                            </p>
                            <p className="text-xl text-gray-500 line-through ml-4">
                                ৳{product.price}
                            </p>
                        </div>
                        <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center">
                            <span className="text-lg font-semibold">
                                {product.offer.discountPercentage}% OFF
                            </span>
                        </div>
                    </div>
                );
            }
        }
        return <p className="text-3xl font-bold text-green-600 mb-4">৳{product.price}</p>;
    };

    return (
        <Layout>
            <div className="py-6">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Product Details Section */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                        <div className="md:flex">
                            {/* Product Image */}
                            <div className="md:w-1/2 relative">
                                <img
                                    src={product.productImageUrl}
                                    alt={product.title}
                                    className="w-full h-96 object-cover"
                                />
                                {product.offer?.isActive && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                                        Special Offer!
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="md:w-1/2 p-8">
                                <div className="mb-2">
                                    <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.title}
                                </h1>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {renderStars(product.reviews?.reduce((acc, review) => acc + review.rating, 0) / (product.reviews?.length || 1))}
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({product.reviews?.length || 0} reviews)
                                        </span>
                                    </div>
                                </div>
                                
                                {renderPrice()}

                                {product.offer?.isActive && product.offer?.validUntil && (
                                    <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                                        <p className="text-yellow-800">
                                            <span className="font-semibold">Hurry!</span> Offer valid until{' '}
                                            {new Date(product.offer.validUntil).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="flex items-center space-x-4">
                                    {cartItems.some((p) => p.id === product.id) ? (
                                        <button
                                            onClick={() => deleteCart(product)}
                                            className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                                        >
                                            <FaShoppingCart />
                                            <span>Remove from Cart</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => addCart(product)}
                                            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                        >
                                            <FaShoppingCart />
                                            <span>Add to Cart</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-700">Customer Reviews</h2>
                            {user && (
                                <button
                                    onClick={() => setShowReviewForm(!showReviewForm)}
                                    className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                    Write a Review
                                </button>
                            )}
                        </div>

                        {/* Review Form */}
                        {showReviewForm && (
                            <form onSubmit={handleReviewSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none"
                                            >
                                                <svg
                                                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Share your thoughts about this product..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}

                        {/* Reviews List */}
                        <div className="space-y-6">
                            {product?.reviews?.length > 0 ? (
                                product.reviews
                                    .sort((a, b) => b.timestamp - a.timestamp)
                                    .map((review, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {review.userName}
                                                    </h3>
                                                    <div className="flex items-center mt-1">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.timestamp.seconds * 1000).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                                    {!user && (
                                        <p className="mt-2 text-sm text-gray-400">
                                            Please login to write a review.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductInfo;