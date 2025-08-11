/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <section className="bg-gradient-to-b from-green-50/50 to-transparent py-16">
            <div className="container px-4 mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Stories</h2>
                    <p className="text-gray-600">Real experiences from our fashion community</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Maya Islam" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://abayaandgown.com/wp-content/uploads/2023/08/Borkha-Unlimited-Hijab1.jpg" 
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "Elanzo makes shopping modest fashion effortless. The abayas fit beautifully and the fabric quality is premium—I feel confident every time I step out!"
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Maya Islam</h3>
                                <p className="text-sm text-gray-500">Fashion Enthusiast</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Tahmina Rahman" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://laz-img-sg.alicdn.com/p/0dbea0b9e33f8333b33b1e7aa8d7a442.jpg" 
                                    
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "I love Elanzo's new arrivals—stylish, modest, and affordable. The tailoring is on point and the size guide is spot on for me."
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(4)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Tahmina Rahman</h3>
                                <p className="text-sm text-gray-500">University Student</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="group">
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50">
                            <div className="flex flex-col items-center">
                                <img 
                                    alt="Md Moynul Islam" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://cdn.pixabay.com/photo/2022/03/16/17/08/boy-7072850_640.jpg" 
                                />
                                <p className="text-gray-600 mb-6 text-center italic">
                                    "Fast delivery, easy returns, and great fits—Elanzo has become my go-to for everyday fashion. The styles are trendy yet modest."
                                </p>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(2)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="font-semibold text-gray-800">Md Moynul Islam</h3>
                                <p className="text-sm text-gray-500">Style Advocate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;