import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaSpinner, FaArrowRight } from 'react-icons/fa';
import myContext from '../../context/myContext';
import { aiProductRecommendations } from '../../utils/geminiAI';

const AIRecommendations = ({ currentProduct, userHistory = [] }) => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const navigate = useNavigate();
    
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentProduct && getAllProduct?.length) {
            generateRecommendations();
        }
    }, [currentProduct, getAllProduct]);

    const generateRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const recommendedIds = await aiProductRecommendations(
                userHistory, 
                currentProduct, 
                getAllProduct
            );
            
            const recommendedProducts = recommendedIds
                .map(id => getAllProduct.find(p => p.id === id))
                .filter(Boolean)
                .slice(0, 4);
                
            setRecommendations(recommendedProducts);
        } catch (err) {
            console.error('AI Recommendations Error:', err);
            setError('Unable to load recommendations');
            // Fallback to category-based recommendations
            const fallbackRecs = getAllProduct
                .filter(p => p.category === currentProduct?.category && p.id !== currentProduct?.id)
                .slice(0, 4);
            setRecommendations(fallbackRecs);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/productinfo/${product.id}`);
    };

    if (!currentProduct || (!isLoading && recommendations.length === 0)) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-2">
                    <FaMagic className="text-green-600 dark:text-green-500 w-5 h-5" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        AI Recommendations
                    </h3>
                </div>
                {isLoading && <FaSpinner className="animate-spin text-green-600 w-4 h-4" />}
            </div>

            {error && (
                <div className="text-red-600 dark:text-red-400 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-3"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-2/3"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendations.map((product, index) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                            onClick={() => handleProductClick(product)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.productImageUrl}
                                    alt={product.title}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/200?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>
                            
                            <div className="p-4">
                                <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm line-clamp-2 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                    {product.title}
                                </h4>
                                
                                {product.category && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-2">
                                        {product.category}
                                    </p>
                                )}
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-green-600 dark:text-green-500">
                                        ৳{product.price}
                                    </span>
                                    <FaArrowRight className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by AI • Personalized for you
                </p>
            </div>
        </div>
    );
};

export default AIRecommendations;
