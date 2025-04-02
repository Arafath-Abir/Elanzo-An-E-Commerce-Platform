import { useNavigate } from "react-router";

const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2553/2553691.png',
        name: 'Face Care'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/1807/1807380.png',
        name: 'Body Care'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2932/2932599.png',
        name: 'Hair Care'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2553/2553657.png',
        name: 'Essential Oils'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/5975/5975423.png',
        name: 'Herbal'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4380/4380458.png',
        name: 'Aromatherapy'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/1807/1807445.png',
        name: 'Wellness'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2553/2553642.png',
        name: 'Gift Sets'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-b from-green-50 to-transparent py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Explore Natural Care</h2>
                <div className="flex flex-col">
                    <div className="flex overflow-x-scroll lg:overflow-hidden lg:justify-center hide-scroll-bar">
                        <div className="flex lg:flex-wrap lg:justify-center gap-4">
                            {category.map((item, index) => {
                                return (
                                    <div key={index} className="px-2 lg:px-4 mb-6">
                                        <div 
                                            onClick={() => navigate(`/category/${item.name}`)} 
                                            className="group flex flex-col items-center"
                                        >
                                            <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 p-4 flex items-center justify-center border border-green-100">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-10 h-10 lg:w-16 lg:h-16 group-hover:scale-110 transition-transform duration-200" 
                                                />
                                            </div>
                                            <h3 className="mt-3 text-sm lg:text-base font-medium text-gray-700 text-center group-hover:text-green-600 transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
}

export default Category;