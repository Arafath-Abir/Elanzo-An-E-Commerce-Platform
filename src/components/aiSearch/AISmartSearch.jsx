import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { FaSearch, FaMagic, FaSpinner } from 'react-icons/fa';
import { aiSmartSearch } from "../../utils/geminiAI";

const AISmartSearch = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isAISearching, setIsAISearching] = useState(false);
    const [aiResults, setAiResults] = useState([]);
    const [useAI, setUseAI] = useState(false);

    const navigate = useNavigate();

    // Basic search filter
    const basicSearchData = getAllProduct && Array.isArray(getAllProduct) 
        ? getAllProduct
            .filter((obj) => obj?.title?.toLowerCase()?.includes(search?.toLowerCase() || ""))
            .slice(0, 6)
        : [];

    // AI-powered search
    const performAISearch = async (query) => {
        if (!query.trim() || !getAllProduct?.length) return;
        
        setIsAISearching(true);
        try {
            const aiProductIds = await aiSmartSearch(query, getAllProduct);
            const aiProducts = aiProductIds
                .map(id => getAllProduct.find(p => p.id === id))
                .filter(Boolean)
                .slice(0, 6);
            setAiResults(aiProducts);
        } catch (error) {
            console.error('AI Search Error:', error);
            setAiResults([]);
        } finally {
            setIsAISearching(false);
        }
    };

    // Debounced AI search
    useEffect(() => {
        if (useAI && search.length > 2) {
            const timer = setTimeout(() => {
                performAISearch(search);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setAiResults([]);
        }
    }, [search, useAI, getAllProduct]);

    const displayResults = useAI ? aiResults : basicSearchData;

    const handleProductSelect = (item) => {
        if (item?.id) {
            navigate(`/productinfo/${item.id}`);
            setSearch("");
            setIsFocused(false);
        }
    };

    const handleKeyDown = (e, item) => {
        if (e.key === 'Enter' && item?.id) {
            handleProductSelect(item);
        }
    };

    return (
        <div className="relative w-full max-w-xs lg:max-w-sm mx-auto">
            {/* Search Input with AI Toggle */}
            <div className="relative">
                <input
                    type="text"
                    placeholder={useAI ? "AI Smart Search..." : "Search products..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full px-4 py-2.5 pl-11 pr-12 bg-white/10 backdrop-blur-md
                             text-white placeholder-white/70 rounded-lg border border-white/20
                             outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                             transition-all duration-300"
                />
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70" />
                
                {/* AI Toggle Button */}
                <button
                    onClick={() => setUseAI(!useAI)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all duration-300 ${
                        useAI 
                            ? 'bg-green-500/30 text-green-300' 
                            : 'bg-white/10 text-white/50 hover:bg-white/20'
                    }`}
                    title={useAI ? "AI Search Active" : "Enable AI Search"}
                >
                    {isAISearching ? (
                        <FaSpinner className="w-3 h-3 animate-spin" />
                    ) : (
                        <FaMagic className="w-3 h-3" />
                    )}
                </button>
            </div>

            {/* Search Dropdown */}
            {(search && isFocused) && (
                <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 transition-colors duration-300">
                    {/* AI Search Indicator */}
                    {useAI && (
                        <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
                            <div className="flex items-center space-x-2 text-xs text-green-700 dark:text-green-400">
                                <FaMagic className="w-3 h-3" />
                                <span>AI-Powered Smart Search</span>
                                {isAISearching && <FaSpinner className="w-3 h-3 animate-spin" />}
                            </div>
                        </div>
                    )}

                    {displayResults.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {displayResults.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                                    onClick={() => handleProductSelect(item)}
                                    onKeyDown={(e) => handleKeyDown(e, item)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`View ${item?.title || 'product'} details`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                                            {item?.productImageUrl && (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={item.productImageUrl}
                                                    alt={item.title || "Product"}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://via.placeholder.com/100?text=No+Image";
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                                {item?.title || "Untitled Product"}
                                            </p>
                                            {item?.category && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                    {item.category}
                                                </p>
                                            )}
                                            {item?.price && (
                                                <p className="text-sm text-green-600 dark:text-green-500 font-medium">
                                                    ৳{item.price}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-gray-600">
                                {isAISearching ? (
                                    <FaSpinner className="w-full h-full animate-spin" />
                                ) : (
                                    <FaSearch className="w-full h-full" />
                                )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">
                                {isAISearching ? "AI is searching..." : "No products found"}
                            </p>
                            {useAI && !isAISearching && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Try describing what you're looking for
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AISmartSearch;
