import { useNavigate } from "react-router";

const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/892/892458.png',
        name: "Men's Fashion"
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2978/2978194.png',
        name: "Women's Fashion"
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3069/3069170.png',
        name: 'Kids & Baby'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2965/2965877.png',
        name: 'Modest Wear'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3531/3531800.png',
        name: 'Ethnic & Traditional'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2978/2978194.png',
        name: 'Dresses'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/892/892721.png',
        name: 'Tops & Shirts'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/892/892735.png',
        name: 'Jeans & Trousers'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/892/892495.png',
        name: 'Outerwear & Jackets'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2965/2965567.png',
        name: 'Activewear'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2829/2829036.png',
        name: 'Loungewear & Sleepwear'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/892/892651.png',
        name: 'Footwear'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3111/3111605.png',
        name: 'Bags & Backpacks'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/1250/1250615.png',
        name: 'Accessories'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/1785/1785363.png',
        name: 'Jewelry & Watches'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4151/4151526.png',
        name: 'Seasonal & Occasion'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-b from-green-50 to-transparent py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Explore Fashion</h2>
                <div className="flex flex-col">
                    <div className="flex overflow-x-scroll lg:overflow-hidden lg:justify-center hide-scroll-bar">
                        <div className="flex lg:flex-wrap lg:justify-center gap-4">
                            {category.map((item, index) => {
                                return (
                                    <div key={index} className="px-2 lg:px-4 mb-6">
                                        <div 
                                            onClick={() => navigate(`/allproduct?category=${encodeURIComponent(item.name)}`)} 
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