import { useState, useCallback } from 'react';
import { 
    aiSmartSearch, 
    aiProductRecommendations, 
    aiEnhanceProductDescription,
    aiAnalyzeReviewSentiment,
    aiCustomerSupport 
} from '../utils/geminiAI';

// Custom hook for AI features
export const useAI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeAIFunction = useCallback(async (aiFunction, ...args) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await aiFunction(...args);
            return result;
        } catch (err) {
            setError(err.message || 'AI operation failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const smartSearch = useCallback(async (query, products) => {
        return executeAIFunction(aiSmartSearch, query, products);
    }, [executeAIFunction]);

    const getRecommendations = useCallback(async (userHistory, currentProduct, allProducts) => {
        return executeAIFunction(aiProductRecommendations, userHistory, currentProduct, allProducts);
    }, [executeAIFunction]);

    const enhanceDescription = useCallback(async (product) => {
        return executeAIFunction(aiEnhanceProductDescription, product);
    }, [executeAIFunction]);

    const analyzeSentiment = useCallback(async (reviews) => {
        return executeAIFunction(aiAnalyzeReviewSentiment, reviews);
    }, [executeAIFunction]);

    const getCustomerSupport = useCallback(async (query, context) => {
        return executeAIFunction(aiCustomerSupport, query, context);
    }, [executeAIFunction]);

    return {
        isLoading,
        error,
        smartSearch,
        getRecommendations,
        enhanceDescription,
        analyzeSentiment,
        getCustomerSupport
    };
};

export default useAI;
