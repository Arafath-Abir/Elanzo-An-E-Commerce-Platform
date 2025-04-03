import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    
    // Calculate subtotal (without shipping)
    const cartSubtotal = cartItems.map(item => {
        const price = parseFloat(item.price || 0);
        const quantity = parseInt(item.quantity || 0);
        
        if (item.offer?.isActive) {
            const discountPercentage = parseFloat(item.offer.discountPercentage || 0);
            const discountedPrice = price * (1 - discountPercentage / 100);
            return discountedPrice * quantity;
        }
        
        return price * quantity;
    }).reduce((prevValue, currValue) => prevValue + currValue, 0);

    // Calculate total shipping cost
    const totalShipping = cartItems.map(item => {
        const quantity = parseInt(item.quantity || 0);
        const shippingCost = parseFloat(item.shippingCost || 0);
        return shippingCost * quantity;
    }).reduce((prevValue, currValue) => prevValue + currValue, 0);

    // Calculate final total (with shipping)
    const cartTotal = cartSubtotal + totalShipping;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const buyNowFunction = () => {
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        }

        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            });
            toast.success("Order Placed Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
        }
    }

    const handlePayment = async () => {
        if (!user) {
            toast.error("Please login to proceed with payment");
            return;
        }

        try {
            // Use environment variable for server URL or fallback to localhost for development
            const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';
            console.log('Using server URL:', SERVER_URL);
            
            const response = await fetch(`${SERVER_URL}/api/ssl/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total_amount: cartTotal,
                    product_name: cartItems.map(item => item.title).join(', '),
                    cus_name: user.name,
                    cus_email: user.email,
                    cus_phone: user.phone || '01700000000',
                    cus_add1: user.address || 'Dhaka',
                    cus_city: 'Dhaka',
                    cus_state: 'Dhaka',
                    cus_postcode: '1000'
                })
            });

            const data = await response.json();
            
            if (data?.url) {
                window.location.href = data.url;
            } else {
                toast.error('Payment initialization failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment system error. Please try again later.');
        }
    };

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 max-w-7xl py-8 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                        <div className="text-sm text-gray-600">
                            {cartItemTotal || 0} {(cartItemTotal || 0) === 1 ? 'item' : 'items'}
                        </div>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-8">
                            {cartItems.length > 0 ? (
                                <div className="space-y-6">
                                    {cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category, offer, shippingCost } = item;
                                        const basePrice = parseFloat(price || 0);
                                        const safeQuantity = parseInt(quantity || 0);
                                        const safeShipping = parseFloat(shippingCost || 0);
                                        
                                        let currentPrice = basePrice;
                                        if (offer?.isActive) {
                                            const discountPercentage = parseFloat(offer.discountPercentage || 0);
                                            currentPrice = basePrice * (1 - discountPercentage / 100);
                                        }
                                        
                                        const itemTotal = currentPrice * safeQuantity;
                                        const itemShipping = safeShipping * safeQuantity;
                                        
                                        return (
                                            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                                                <div className="flex items-start space-x-6">
                                                    <div className="relative h-24 w-24 flex-shrink-0">
                                                        <img
                                                            src={productImageUrl}
                                                            alt={title}
                                                            className="h-full w-full rounded-lg object-cover"
                                                        />
                                                        {offer?.isActive && (
                                                            <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                                                                Offer!
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-medium text-gray-900">{title}</h3>
                                                                <p className="text-sm text-gray-500 capitalize">{category}</p>
                                                                {offer?.isActive && (
                                                                    <div className="flex items-center mt-1">
                                                                        <p className="text-sm text-red-500 font-medium">
                                                                            {parseFloat(offer.discountPercentage || 0).toFixed(0)}% OFF
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 line-through ml-2">
                                                                            ৳{basePrice.toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Shipping: ৳{safeShipping.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
                                                            >
                                                                <Trash size={16} />
                                                                <span>Remove</span>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => handleDecrement(id)}
                                                                    className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="w-8 text-center font-medium">
                                                                    {safeQuantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleIncrement(id)}
                                                                    className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                            <div className="font-medium text-gray-900">
                                                                ৳{itemTotal.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Looks like you haven't added anything to your cart yet.
                                    </p>
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="mt-8 lg:col-span-4 lg:mt-0">
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <p className="text-gray-600">
                                                    Subtotal ({cartItemTotal || 0} {(cartItemTotal || 0) === 1 ? 'item' : 'items'})
                                                </p>
                                                <p className="font-medium text-gray-900">৳{cartSubtotal.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <p className="text-gray-600">Shipping</p>
                                                <p className="font-medium text-gray-900">৳{totalShipping.toFixed(2)}</p>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex justify-between">
                                                    <p className="text-base font-medium text-gray-900">Order Total</p>
                                                    <p className="text-base font-medium text-gray-900">৳{cartTotal.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="mt-6">
                                                <BuyNowModal
                                                    addressInfo={addressInfo}
                                                    setAddressInfo={setAddressInfo}
                                                    buyNowFunction={buyNowFunction}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    onClick={handlePayment}
                                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    Pay Now (SSLCommerz)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Refund Policy Section */}
                    <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund and Return Policy</h2>
                        <div className="prose max-w-none">
                            <p className="text-gray-600 mb-4">
                                We maintain a 'closed box delivery' policy to ensure product authenticity, customer privacy, and prevent product adulteration.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Return Conditions:</h3>
                            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                                <li>
                                    For damaged, defective, or wrong products, contact our Customer Service team immediately with photo/video evidence.
                                </li>
                                <li>
                                    Valid for 3 days from product receipt. Electronics items have a 15-day replacement guarantee.
                                </li>
                                <li>
                                    Used, swatched, or liquid/semi-liquid products are not eligible for exchange or refund.
                                </li>
                                <li>
                                    Returns not accepted after seal is broken or for personal preference reasons (smell, texture, color, etc.).
                                </li>
                                <li>
                                    Original invoice and undamaged product packaging must be returned.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Return Process:</h3>
                            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                                <li>
                                    Contact our Customer Service team through email or phone.
                                </li>
                                <li>
                                    Upon approval, complete return process within 3 days.
                                </li>
                                <li>
                                    For approved returns, we'll arrange pickup through our courier partner (no cost to you).
                                </li>
                                <li>
                                    Pickup may take up to 7 working days, and replacement delivery up to 7 additional working days.
                                </li>
                            </ul>
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">How to send your product back to us? How much will it cost you?</h3>
                            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                                <li>
                                Both in Dhaka and outside Dhaka, the product will be arranged for pickup through a third-party courier by our Customer Relationship Management department. You will not have to bear any cost in this case (Conditions applied)
                                </li>
                                <li>
                                For pickup, a maximum of 7 working days may be required, and after the picked-up product reaches Shajgoj, up to 7 working days may be needed for the exchange delivery.
                                </li>

                            </ul>
                            <div className="mt-6 bg-green-50 p-4 rounded-lg">
                                <h4 className="text-green-800 font-medium mb-2">Contact Support</h4>
                                <p className="text-green-700">
                                    Email: support@organicahub.com<br />
                                    Phone: +880 123-456-7890
                                </p>
                            </div>

                            <p className="mt-6 text-sm text-gray-500">
                                Customer satisfaction is our top priority. If you receive a defective or incorrect product, 
                                we ensure replacement or full refund after receiving the returned item. No additional shipping 
                                charges for replacement of defective products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;