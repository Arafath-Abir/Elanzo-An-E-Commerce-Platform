import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
    return (
        <div className="pt-3">
            <div className="container mx-auto px-4">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl">
                    <Carousel
                        autoplay={true}
                        autoplayDelay={6000}
                        loop={true}
                        className="rounded-2xl h-full"
                        prevArrow={({ handlePrev }) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={handlePrev}
                                className="!absolute top-1/2 left-4 -translate-y-1/2 bg-green-800/30 hover:bg-green-800/50 backdrop-blur-sm"
                            >
                                <ArrowLeftIcon strokeWidth={3} className="w-6 h-6" />
                            </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                            <IconButton
                                variant="text"
                                color="white"
                                size="lg"
                                onClick={handleNext}
                                className="!absolute top-1/2 right-4 -translate-y-1/2 bg-green-800/30 hover:bg-green-800/50 backdrop-blur-sm"
                            >
                                <ArrowRightIcon strokeWidth={3} className="w-6 h-6" />
                            </IconButton>
                        )}
                        navigation={({ setActiveIndex, activeIndex, length }) => (
                            <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
                                {new Array(length).fill("").map((_, i) => (
                                    <span
                                        key={i}
                                        className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${
                                            activeIndex === i ? "w-8 bg-green-500" : "w-4 bg-green-200/50"
                                        }`}
                                        onClick={() => setActiveIndex(i)}
                                    />
                                ))}
                            </div>
                        )}
                    >
                        <div className="relative h-full">
                            <img
                                src="https://i.postimg.cc/kXLn3b0F/Accessories.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
                                <div className="w-3/4 text-center md:w-2/4">
                                    <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl text-white font-bold"></h1>
                                    <p className="mb-6 text-sm md:text-lg text-green-100 opacity-80">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full">
                            <img
                                src="https://i.postimg.cc/2y85yNGQ/offer.png"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
                                <div className="w-3/4 text-center md:w-2/4">
                                    <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl text-white font-bold"></h1>
                                    <p className="mb-6 text-sm md:text-lg text-green-100 opacity-80">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full">
                            <img
                                src="https://i.postimg.cc/FFWrpqG6/womenfashion.jpg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
                                <div className="w-3/4 text-center md:w-2/4">
                                    <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl text-white font-bold"></h1>
                                    <p className="mb-6 text-sm md:text-lg text-green-100 opacity-80">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                       
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;