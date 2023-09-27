export const About = () => {
    return (

        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">At RentAway, our mission is to revolutionize the way you experience fashion while traveling. We offer a seamless platform that empowers you to both share and discover the perfect clothing for any occasion. With our user-friendly functionalities, you can effortlessly rent out your clothing, ensuring your wardrobe remains dynamic and environmentally conscious. Need a unique outfit for an upcoming trip? Our platform allows you to explore a diverse range of clothing options available for rent. What sets us apart is our airport pickup service, offering you the convenience of collecting your chosen pieces right at the airport, making your journey even more convenient and stylish. At RentAway, we believe in redefining travel fashion, making it not only accessible but also sustainable, allowing you to embrace every adventure with confidence and flair.</p>
                </div>
                <div className="w-full lg:w-8/12">
                    <img className="w-full h-full" src="nicerack.webp" alt="A group of People" />
                </div>
            </div>
    
            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">RentAway is a unique and innovative clothing rental company born out of the ever-changing lifestyle of frequent travelers. Our founders recognized the challenge of maintaining a versatile wardrobe while constantly on the move, especially when the need for specific clothing items arises only occasionally. Whether you're a jet-setter living in a warm climate but occasionally traveling to colder destinations or a globe-trotter with diverse fashion needs, RentAway is your ultimate solution. We provide a curated collection of stylish and high-quality clothing items that you can rent for those special occasions or seasonal changes, ensuring that you're always dressed to impress, no matter where your adventures take you. With RentAway, you can travel light, reduce waste, and embrace the freedom of a dynamic, ever-changing wardrobe.</p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Image" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured image" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured image" />
                            <p className="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">Elijah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    )
}