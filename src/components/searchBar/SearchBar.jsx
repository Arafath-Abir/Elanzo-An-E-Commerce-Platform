import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();

    // Safely handle the search filter
    const filterSearchData = getAllProduct && Array.isArray(getAllProduct) 
        ? getAllProduct
            .filter((obj) => obj?.title?.toLowerCase()?.includes(search?.toLowerCase() || ""))
            .slice(0, 6)
        : [];

    // Handle product selection
    const handleProductSelect = (item) => {
        if (item?.id) {
            navigate(`/productinfo/${item.id}`);
            setSearch("");
            setIsFocused(false);
        }
    };

    // Handle key navigation
    const handleKeyDown = (e, item) => {
        if (e.key === 'Enter' && item?.id) {
            handleProductSelect(item);
        }
    };

    return (
        <div className="relative w-full max-w-xs lg:max-w-sm mx-auto">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full px-4 py-2.5 pl-11 bg-white/10 backdrop-blur-md
                             text-white placeholder-white/70 rounded-lg border border-white/20
                             outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                             transition-all duration-300"
                />
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70" />
            </div>

            {/* Search Dropdown */}
            {(search && isFocused) && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                    {filterSearchData.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {filterSearchData.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-green-50 cursor-pointer transition-colors duration-200"
                                    onClick={() => handleProductSelect(item)}
                                    onKeyDown={(e) => handleKeyDown(e, item)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`View ${item?.title || 'product'} details`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
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
                                            <p className="text-sm font-medium text-gray-900 truncate hover:text-green-600 transition-colors">
                                                {item?.title || "Untitled Product"}
                                            </p>
                                            {item?.price && (
                                                <p className="text-sm text-green-600 font-medium">
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
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-200">
                                <FaSearch className="w-full h-full" />
                            </div>
                            <p className="text-gray-500">No products found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;