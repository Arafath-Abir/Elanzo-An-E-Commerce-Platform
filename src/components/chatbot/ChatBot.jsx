import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm OrganicaBot. I can help you with information about OrganicaHub, our products, services, and features. What would you like to know?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const API_KEY = 'AIzaSyA5eMFxn0IVUxd7l6WV76e7AkYf3mmTRBo';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // Project-specific knowledge base
    const projectInfo = {
        about: "OrganicaHub is an e-commerce platform specializing in natural and organic beauty products. We focus on sustainability, pure ingredients, and eco-friendly practices.",
        features: [
            "Product browsing and search",
            "User authentication and profiles",
            "Shopping cart functionality",
            "Secure payment processing",
            "Admin dashboard for product management",
            "Order tracking system",
            "Customer testimonials",
            "Category-based product filtering"
        ],
        technologies: [
            "React.js for frontend",
            "Tailwind CSS for styling",
            "Redux for state management",
            "Firebase for backend services",
            "Payment gateway integration",
            "Responsive design for all devices"
        ]
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generatePrompt = (userMessage) => {
        return `You are OrganicaBot, a helpful assistant for the OrganicaHub e-commerce platform. Here's some context about the project:

Project: ${projectInfo.about}
Features: ${projectInfo.features.join(", ")}
Technologies: ${projectInfo.technologies.join(", ")}

User question: ${userMessage}

Please provide a helpful, concise response about OrganicaHub. If the question is not related to OrganicaHub, politely mention that you're focused on helping with OrganicaHub-related questions. Keep the response friendly and professional.`;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = { text: inputMessage, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: generatePrompt(inputMessage) }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.";
            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", 
                isBot: true 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full p-4 shadow-lg
                         transition-transform duration-200 hover:scale-110"
            >
                {isOpen ? (
                    <FaTimes className="w-6 h-6" />
                ) : (
                    <FaRobot className="w-6 h-6" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl 
                              flex flex-col border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-pink-600 text-white p-4 flex items-center space-x-3">
                        <FaRobot className="w-6 h-6" />
                        <div>
                            <h3 className="font-semibold">OrganicaBot</h3>
                            <p className="text-sm text-pink-100">Online</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}
                            >
                                <div
                                    className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                                        message.isBot
                                            ? 'bg-white border border-gray-200'
                                            : 'bg-pink-600 text-white'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Ask about OrganicaHub..."
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none 
                                         focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim()}
                                className="bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-700 
                                         transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaPaperPlane className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
