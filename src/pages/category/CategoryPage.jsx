import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <Layout>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">{categoryname}</h1>
                        <p className="text-gray-600">Discover the latest trends in fashion with our curated collections {categoryname.toLowerCase()} collection</p>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filterProduct.length > 0 ? (
                                filterProduct.map((item, index) => {
                                    const { id, title, price, productImageUrl, description = '' } = item;
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
                                                    <span className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full capitalize">
                                                        {categoryname}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="mb-4">
                                                        <h2 className="text-sm text-green-600 font-medium mb-1">
                                                            Elanzo
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
                                                        <div className="text-2xl font-bold text-gray-800 mb-4">
                                                            ৳{price}
                                                        </div>
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
                                <div className="col-span-full flex flex-col items-center justify-center py-12">
                                    <img 
                                        className="w-24 h-24 mb-4 opacity-75" 
                                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" 
                                        alt="No products found" 
                                    />
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h2>
                                    <p className="text-gray-500">
                                        We couldn't find any {categoryname.toLowerCase()} products at the moment.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default CategoryPage;