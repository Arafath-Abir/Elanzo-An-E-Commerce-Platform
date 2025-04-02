import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const {getAllProduct} = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const serializeItem = (item) => ({
        ...item,
        time: item.time ? new Date(item.time.seconds * 1000).toISOString() : null
    });

    const addCart = (item) => {
        dispatch(addToCart(serializeItem(item)));
        toast.success("Added to cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(serializeItem(item)));
        toast.success("Removed from cart");
    }

    const renderPrice = (product) => {
        if (product.offer && product.offer.isActive) {
            const currentDate = new Date();
            const validUntil = product.offer.validUntil ? new Date(product.offer.validUntil) : null;
            
            if (!validUntil || currentDate <= validUntil) {
                return (
                    <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-gray-800">
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
        return <p className="text-2xl font-bold text-gray-800">৳{product.price}</p>;
    };

    const renderStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(
                    <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                );
            } else if (i - 0.5 === roundedRating) {
                stars.push(
                    <FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />
                );
            } else {
                stars.push(
                    <FaRegStar key={i} className="text-yellow-400 w-4 h-4" />
                );
            }
        }
        return stars;
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <section className="py-16 bg-gradient-to-b from-green-50/50 to-transparent">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Bestselling Products</h2>
                    <p className="text-gray-600">Discover our most loved natural skincare solutions</p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getAllProduct && getAllProduct.length > 0 ? (
                        getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl, description = '', category = '', offer = {}, reviews = [] } = item;
                            return (
                                <div key={index} className="group">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                            {category && (
                                                <span className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full capitalize">
                                                    {category}
                                                </span>
                                            )}
                                            {offer?.isActive && (
                                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                                                    Offer!
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h2 className="text-sm text-green-600 font-medium mb-1">
                                                    OrganicaHub
                                                </h2>
                                                <h3 
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors duration-200"
                                                >
                                                    {title}
                                                </h3>
                                                {description && (
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                                        {description}
                                                    </p>
                                                )}
                                                <div className="flex items-center mb-2">
                                                    <div className="flex mr-2">
                                                        {renderStars(reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        ({reviews.length || 0})
                                                    </span>
                                                </div>
                                                {renderPrice(item)}
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Remove from Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2.5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                        </svg>
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                                <p className="text-gray-600">No products available at the moment</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HomePageProductCard;