import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled
    const toggleVisibility = () => {
        if (window.scrollY > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed left-6 bottom-6 z-50 p-3 bg-pink-600 text-white rounded-full shadow-lg 
                    hover:bg-pink-700 transition-all duration-300 transform hover:scale-110
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="text-xl" />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
