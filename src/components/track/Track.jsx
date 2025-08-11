const Track = () => {
    return (
        <section className="bg-gradient-to-b from-green-50/50 to-transparent">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Choose Elanzo?</h2>
                    <p className="text-gray-600">Discover trend-forward styles with comfort, quality, and value</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50 h-full">
                            <div className="mb-6 text-green-600 bg-green-50 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Designed for Everyday Style</h3>
                            <p className="text-gray-600">
                                Curated collections for modest and contemporary fashion—comfortable fits, versatile looks, and premium fabrics you’ll love
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50 h-full">
                            <div className="mb-6 text-green-600 bg-green-50 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Guaranteed</h3>
                            <p className="text-gray-600">
                                Every piece is quality-checked for stitching, fabric, and fit—plus a reliable size guide to help you pick with confidence
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="group">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50 h-full">
                            <div className="mb-6 text-green-600 bg-green-50 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ethically Made</h3>
                            <p className="text-gray-600">
                                Responsible sourcing and fair production practices—crafted with care for people and the planet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Track;