export const HomepageSecond = () => {
    return (
            <section className="h-screen w-full homepage-2 rounded-xl flex flex-col items-center justify-center">
            <div className="container">
                <div>
                    <div className="text-white font-bold text-base md:text-4xl lg:text-6xl text-center align-middle mb-14 text-shadow" >An easier affordable way to travel.</div>
                </div>

                <div className="mt-4">
                    <p className="text-white text-sm md:text-4xl text-center align-middle my-2 text-shadow" >RentAway makes travelling more convenient.</p>
                    <p className="text-white text-sm md:text-4xl text-center align-middle text-shadow">Easily rent clothes from one place for all your colder or hotter travel destinations!</p>
                </div>

                <div className="sub-container">
                    <div className="grid md:grid-cols-3 gap-30 md:mt-24">
                        <div className="flex flex-col items-center text-center">
                            <img src="/cursor-hand.svg" className="icon-size "/>
                            <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">RENT</h1>
                            <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Rent a clothing item like a jacket in the destination you're traveling to</p>
                        </div>
                            
                        <div className="flex flex-col items-center text-center">
                            <img src="/rain-jacket.png" className="icon-size"/>
                            <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">WEAR</h1>
                            <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Dress warm in style and within your travel budget</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <img src="/arrows.png" className="icon-size"/>
                            <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">RETURN</h1>
                            <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Relieves the hassle of packing heavy</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}