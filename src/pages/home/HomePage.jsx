import { useContext, useState, useEffect } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import ChatBot from "../../components/chatbot/ChatBot";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { X } from 'lucide-react';

const HomePage = () => {
    const context = useContext(myContext);
    const { loading } = context;
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Layout>
            {loading && <Loader />}
            <HeroSection/>
            <Category/>
            <HomePageProductCard/>
            <Track/>
            <Testimonial/>
            <ChatBot />

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative max-w-lg w-full">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute -top-2 -right-2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        {/* Popup Image */}
                        <img
                            src="https://i.postimg.cc/Y970cWmy/hero.jpg"
                            alt="Special Offer"
                            className="w-full h-auto rounded-lg shadow-2xl"
                            style={{ maxHeight: '90vh', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default HomePage;