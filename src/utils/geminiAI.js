// Gemini AI utility functions for Elanzo e-commerce platform
const GEMINI_API_KEY = 'AIzaSyAxsK_qradSp0pG9-KxV-_xXb4swhEeMhQ';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Helper function to sanitize and parse JSON from markdown-formatted responses
const sanitizeAndParseJSON = (response) => {
    if (!response) return null;
    
    // Remove markdown code block formatting
    let cleanedResponse = response.trim();
    
    // Remove ```json and ``` markers
    cleanedResponse = cleanedResponse.replace(/^```json\s*/i, '');
    cleanedResponse = cleanedResponse.replace(/^```\s*/i, '');
    cleanedResponse = cleanedResponse.replace(/\s*```$/i, '');
    
    // Remove any leading/trailing whitespace
    cleanedResponse = cleanedResponse.trim();
    
    return JSON.parse(cleanedResponse);
};

// Generic function to call Gemini API
export const callGeminiAPI = async (prompt) => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};

// AI-powered smart search with natural language processing
export const aiSmartSearch = async (query, products) => {
    const prompt = `
You are an AI assistant for an e-commerce platform. Given a user search query and a list of products, help find the most relevant products.

User Query: "${query}"

Products: ${JSON.stringify(products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price
})))}

Instructions:
1. Analyze the user's intent and search for products that match semantically, not just by exact keywords
2. Consider synonyms, related terms, and context
3. Return a JSON array of product IDs ranked by relevance (most relevant first)
4. Include only products that are actually relevant to the query
5. If no products match, return an empty array

Return only the JSON array, no other text.
`;

    try {
        const response = await callGeminiAPI(prompt);
        return sanitizeAndParseJSON(response);
    } catch (error) {
        console.error('AI Smart Search Error:', error);
        // Fallback to basic search
        return products
            .filter(p => p.title?.toLowerCase().includes(query.toLowerCase()))
            .map(p => p.id);
    }
};

// AI-powered product recommendations
export const aiProductRecommendations = async (userHistory, currentProduct, allProducts) => {
    const prompt = `
You are an AI recommendation engine for an e-commerce platform. Generate personalized product recommendations.

Current Product: ${JSON.stringify(currentProduct)}
User Purchase/View History: ${JSON.stringify(userHistory)}
Available Products: ${JSON.stringify(allProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    description: p.description
})))}

Instructions:
1. Recommend products based on the current product and user history
2. Consider complementary products, similar items, and user preferences
3. Avoid recommending the current product or products already in history
4. Return a JSON array of up to 6 product IDs ranked by recommendation strength
5. Focus on products that would genuinely interest the user

Return only the JSON array, no other text.
`;

    try {
        const response = await callGeminiAPI(prompt);
        return sanitizeAndParseJSON(response);
    } catch (error) {
        console.error('AI Recommendations Error:', error);
        // Fallback to category-based recommendations
        return allProducts
            .filter(p => p.category === currentProduct?.category && p.id !== currentProduct?.id)
            .slice(0, 6)
            .map(p => p.id);
    }
};

// AI-powered product description enhancement
export const aiEnhanceProductDescription = async (product) => {
    const prompt = `
You are an AI copywriter for an e-commerce platform. Enhance the product description to be more engaging and informative.

Product: ${JSON.stringify(product)}

Instructions:
1. Create an enhanced, compelling product description
2. Highlight key features and benefits
3. Use persuasive but honest language
4. Keep it concise but informative (2-3 sentences)
5. Maintain the original product information accuracy
6. Make it suitable for fashion/beauty products

Return only the enhanced description text, no other formatting.
`;

    try {
        const response = await callGeminiAPI(prompt);
        return response.trim();
    } catch (error) {
        console.error('AI Description Enhancement Error:', error);
        return product.description || product.title;
    }
};

// AI-powered review sentiment analysis
export const aiAnalyzeReviewSentiment = async (reviews) => {
    const prompt = `
Analyze the sentiment of these product reviews and provide insights.

Reviews: ${JSON.stringify(reviews)}

Instructions:
1. Analyze overall sentiment (positive, negative, neutral)
2. Identify key themes and concerns
3. Calculate sentiment percentages
4. Provide actionable insights

Return a JSON object with:
{
    "overallSentiment": "positive|negative|neutral",
    "positivePercentage": number,
    "negativePercentage": number,
    "neutralPercentage": number,
    "keyThemes": ["theme1", "theme2"],
    "insights": "brief summary of insights"
}
`;

    try {
        const response = await callGeminiAPI(prompt);
        return sanitizeAndParseJSON(response);
    } catch (error) {
        console.error('AI Sentiment Analysis Error:', error);
        return {
            overallSentiment: "neutral",
            positivePercentage: 50,
            negativePercentage: 25,
            neutralPercentage: 25,
            keyThemes: [],
            insights: "Unable to analyze reviews at this time."
        };
    }
};

// AI-powered price optimization suggestions
export const aiPriceOptimization = async (product, marketData) => {
    const prompt = `
You are an AI pricing analyst. Analyze this product and suggest optimal pricing strategies.

Product: ${JSON.stringify(product)}
Market Data: ${JSON.stringify(marketData)}

Instructions:
1. Analyze current pricing vs market trends
2. Consider product category, features, and competition
3. Suggest optimal price range
4. Provide reasoning for recommendations

Return a JSON object with:
{
    "suggestedPrice": number,
    "priceRange": {"min": number, "max": number},
    "reasoning": "explanation of pricing strategy",
    "confidence": "high|medium|low"
}
`;

    try {
        const response = await callGeminiAPI(prompt);
        return sanitizeAndParseJSON(response);
    } catch (error) {
        console.error('AI Price Optimization Error:', error);
        return {
            suggestedPrice: product.price,
            priceRange: { min: product.price * 0.9, max: product.price * 1.1 },
            reasoning: "Unable to analyze pricing at this time.",
            confidence: "low"
        };
    }
};

// AI-powered customer support
export const aiCustomerSupport = async (query, context) => {
    const prompt = `
You are an AI customer support agent for Elanzo, an e-commerce platform specializing in natural and organic beauty products.

Customer Query: "${query}"
Context: ${JSON.stringify(context)}

Instructions:
1. Provide helpful, accurate information about Elanzo products and services
2. Be friendly, professional, and empathetic
3. If you can't answer something, suggest contacting human support
4. Focus on solving the customer's problem
5. Keep responses concise but complete

Provide a helpful response to the customer.
`;

    try {
        const response = await callGeminiAPI(prompt);
        return response.trim();
    } catch (error) {
        console.error('AI Customer Support Error:', error);
        return "I'm sorry, I'm having trouble processing your request right now. Please contact our support team for assistance.";
    }
};

export default {
    callGeminiAPI,
    aiSmartSearch,
    aiProductRecommendations,
    aiEnhanceProductDescription,
    aiAnalyzeReviewSentiment,
    aiPriceOptimization,
    aiCustomerSupport
};
