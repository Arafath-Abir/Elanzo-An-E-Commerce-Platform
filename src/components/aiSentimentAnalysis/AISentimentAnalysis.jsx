import { useState, useEffect } from 'react';
import { FaChartBar, FaSpinner, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';
import { aiAnalyzeReviewSentiment } from '../../utils/geminiAI';

const AISentimentAnalysis = ({ reviews = [] }) => {
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (reviews.length > 0) {
            analyzeSentiment();
        }
    }, [reviews]);

    const analyzeSentiment = async () => {
        setIsAnalyzing(true);
        setError(null);
        
        try {
            const result = await aiAnalyzeReviewSentiment(reviews);
            setAnalysis(result);
        } catch (err) {
            console.error('Sentiment Analysis Error:', err);
            setError('Unable to analyze reviews');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return <FaSmile className="text-green-500" />;
            case 'negative':
                return <FaFrown className="text-red-500" />;
            default:
                return <FaMeh className="text-yellow-500" />;
        }
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return 'text-green-600 dark:text-green-400';
            case 'negative':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-yellow-600 dark:text-yellow-400';
        }
    };

    if (reviews.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center transition-colors duration-300">
                <FaChartBar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No reviews available for analysis</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-6">
                <FaChartBar className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    AI Sentiment Analysis
                </h3>
                {isAnalyzing && <FaSpinner className="animate-spin text-blue-600 w-4 h-4" />}
            </div>

            {error && (
                <div className="text-red-600 dark:text-red-400 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                </div>
            )}

            {isAnalyzing ? (
                <div className="animate-pulse space-y-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded h-20"></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded h-16"></div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded h-16"></div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded h-16"></div>
                    </div>
                </div>
            ) : analysis ? (
                <div className="space-y-6">
                    {/* Overall Sentiment */}
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            {getSentimentIcon(analysis.overallSentiment)}
                            <span className={`text-lg font-semibold capitalize ${getSentimentColor(analysis.overallSentiment)}`}>
                                {analysis.overallSentiment} Overall Sentiment
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Sentiment Breakdown */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <FaSmile className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {analysis.positivePercentage}%
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">Positive</div>
                        </div>
                        
                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <FaMeh className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {analysis.neutralPercentage}%
                            </div>
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">Neutral</div>
                        </div>
                        
                        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <FaFrown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {analysis.negativePercentage}%
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-300">Negative</div>
                        </div>
                    </div>

                    {/* Key Themes */}
                    {analysis.keyThemes && analysis.keyThemes.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Key Themes</h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis.keyThemes.map((theme, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                                    >
                                        {theme}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Insights */}
                    {analysis.insights && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">AI Insights</h4>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                                <p className="text-gray-700 dark:text-gray-300">{analysis.insights}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by AI • Real-time sentiment analysis
                </p>
            </div>
        </div>
    );
};

export default AISentimentAnalysis;
