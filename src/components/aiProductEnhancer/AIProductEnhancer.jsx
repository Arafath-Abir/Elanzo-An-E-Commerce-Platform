import { useState } from 'react';
import { FaMagic, FaSpinner, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { aiEnhanceProductDescription } from '../../utils/geminiAI';

const AIProductEnhancer = ({ product, onUpdate }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhancedDescription, setEnhancedDescription] = useState('');
    const [showEnhanced, setShowEnhanced] = useState(false);

    const handleEnhanceDescription = async () => {
        setIsEnhancing(true);
        try {
            const enhanced = await aiEnhanceProductDescription(product);
            setEnhancedDescription(enhanced);
            setShowEnhanced(true);
        } catch (error) {
            console.error('Enhancement Error:', error);
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleAcceptEnhancement = () => {
        if (onUpdate) {
            onUpdate({ ...product, description: enhancedDescription });
        }
        setShowEnhanced(false);
    };

    const handleRejectEnhancement = () => {
        setShowEnhanced(false);
        setEnhancedDescription('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                    <FaMagic className="text-purple-600 dark:text-purple-400" />
                    <span>AI Product Enhancer</span>
                </h3>
                
                <button
                    onClick={handleEnhanceDescription}
                    disabled={isEnhancing}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                >
                    {isEnhancing ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            <span>Enhancing...</span>
                        </>
                    ) : (
                        <>
                            <FaEdit />
                            <span>Enhance Description</span>
                        </>
                    )}
                </button>
            </div>

            {/* Original Description */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Current Description:</h4>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {product?.description || 'No description available'}
                </p>
            </div>

            {/* Enhanced Description */}
            {showEnhanced && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2 flex items-center space-x-1">
                        <FaMagic className="w-3 h-3" />
                        <span>AI Enhanced Description:</span>
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-3 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 mb-3">
                            {enhancedDescription}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleAcceptEnhancement}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                            >
                                <FaCheck className="w-3 h-3" />
                                <span>Accept</span>
                            </button>
                            <button
                                onClick={handleRejectEnhancement}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                            >
                                <FaTimes className="w-3 h-3" />
                                <span>Reject</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
                AI will analyze your product and create a more engaging, informative description
            </div>
        </div>
    );
};

export default AIProductEnhancer;
