/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <section className="bg-gradient-to-b from-green-50/50 to-transparent py-16">
            <div className="container px-4 mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Stories</h2>
                    <p className="text-gray-600">Real experiences from our natural beauty community</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Sarah Johnson" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80" 
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "I've tried many natural skincare products, but OrganicaHub's commitment to pure ingredients and sustainability sets them apart. My skin has never felt better!"
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Sarah Johnson</h3>
                                <p className="text-sm text-gray-500">Wellness Enthusiast</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Michael Chen" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80" 
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "The aromatherapy collection has transformed my daily self-care routine. The quality and purity of these essential oils is exceptional."
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Michael Chen</h3>
                                <p className="text-sm text-gray-500">Aromatherapy Expert</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Emily Rodriguez" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80" 
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "As someone with sensitive skin, finding OrganicaHub was a game-changer. Their natural products are gentle yet effective. I'm a customer for life!"
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Emily Rodriguez</h3>
                                <p className="text-sm text-gray-500">Holistic Skincare Advocate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;