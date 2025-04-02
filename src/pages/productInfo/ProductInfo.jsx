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

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-12 -mx-4">
                            {/* Product Image */}
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="">
                                    <img
                                        className="w-full lg:h-[39em] rounded-lg object-cover"
                                        src={product?.productImageUrl}
                                        alt={product?.title}
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6">
                                        <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {product?.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">
                                            <div className="flex items-center mb-4">
                                                {renderStars(product?.reviews?.reduce((acc, review) => acc + review.rating, 0) / (product?.reviews?.length || 1))}
                                                <span className="ml-2 text-sm text-gray-500">
                                                    ({product?.reviews?.length || 0} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                            <span>৳{product?.price}</span>
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {product?.description}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="w-full px-4 py-3 text-center text-white bg-red-600 border border-transparent dark:border-gray-700 hover:bg-red-700 rounded-xl"
                                            >
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(product)}
                                                className="w-full px-4 py-3 text-center text-white bg-green-600 border border-transparent dark:border-gray-700 hover:bg-green-700 rounded-xl"
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mb-12">
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
                                <form onSubmit={handleReviewSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-sm">
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
                                    product.reviews.sort((a, b) => b.timestamp - a.timestamp).map((review, index) => (
                                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
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
                )}
            </section>
        </Layout>
    );
}

export default ProductInfo;