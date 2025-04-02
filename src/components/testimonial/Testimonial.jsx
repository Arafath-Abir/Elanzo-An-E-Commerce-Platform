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
                                    alt="Maya Islam" 
                                    className="w-20 h-20 mb-6 object-cover rounded-full ring-4 ring-green-50 group-hover:scale-110 transition-transform duration-300" 
                                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/483585920_122282239982002937_5994135350679510964_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3n6l-fflzgdcQnXuHUgGxDnrjAvvB-poOeuMC-8H6miBpfUmUfUOE9ZdCCmlcE8ZeFVvK-r8DoDkg2ECoXZ00&_nc_ohc=MLnpOPzgXV4Q7kNvgE6PZYV&_nc_oc=Adl7vZO5kLmAoIXPHD03CH3B8Th3md68qcxgRTieMi9TrO0rrU6cUsW0VCC7_Gq993Q&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=rYiyVbj0AuvvqCCpztT_bQ&oh=00_AYFdaLKOAxfz0gks5pdPYPiI7Q3LPwXR78_dbw4PPJ0Ciw&oe=67F3595E" 
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
                                <h3 className="font-semibold text-gray-800">Maya Islam</h3>
                                <p className="text-sm text-gray-500">Wellness Enthusiast</p>
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
                                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/480524110_1085206423357518_952964435779717626_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGCg6rd9rHmIMvVdeERBSyuAwu5JdqUio8DC7kl2pSKj-kKjP68vWHTajXzGkrvmLICtWk7fUmrBLIx03X5TYg6&_nc_ohc=LENuyFit-cwQ7kNvgGrO3GO&_nc_oc=AdlJDK_0NpizVWUDYtY1tGZEB8yoWfbPFFU0QJo3crxK4P46xtY9zGkznkRE2lvsiyY&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=BRtMlHFw7RSpnwSuCB49Vg&oh=00_AYHZQ22NMZQo9KLyc5Rr6wlP3z7ef0uFVFKF3d94xc3NLQ&oe=67F33AE0" 
                                    
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
                                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/357763804_3719561341701334_5374482705512492451_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG52vIJh8bPHp7bDvbTCFShugxsJJNeVtO6DGwkk15W08vFCxx1EaXE5l63FwUFI55QSpkk1L-0CTgxeLeYFCSB&_nc_ohc=ISOIwDqTZgoQ7kNvgEkwCcY&_nc_oc=AdmaYe1Ayi4lmJ5c0gLY5l3YwGu06ZG0nBWYEamzH1nhwaw9yRKQCOJchrU3azvKWBM&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ME1c4EOBQKySRv_gjzQnPw&oh=00_AYF5i8zQ6FtL_AivxqGBVjKLFJSpYAGRc33I_VFZVBdiig&oe=67F35A0B" 
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
                                <h3 className="font-semibold text-gray-800">Md Moynul Islam</h3>
                                <p className="text-sm text-gray-500">Skincare Advocate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;