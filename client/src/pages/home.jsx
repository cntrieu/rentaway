import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
    <section className="h-screen w-full homepage-1 rounded-xl flex flex-col items-center justify-center">
     
            <div className="text-white font-bold md:text-4xl lg:text-4xl text-center align-middle mb-3" style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 1)' }}>Travel On A Budget</div>
            <Link to={'/clothing'} className="hover-opacity border rounded-full text-md py-2 px-4 text-white">Rent Today</Link>
    </section>

    <section className="h-screen w-full homepage-2 rounded-xl flex flex-col items-center justify-center">
        <div className="container">
            <div>
                <div className="text-white font-bold text-base md:text-4xl lg:text-6xl text-center align-middle mb-14" style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 1)' }}>An easier affordable way to travel.</div>
            </div>

            <div className="mt-4">
                <p className="text-white text-sm md:text-4xl text-center align-middle my-2 " style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 1)' }}>RentAway makes travelling more convenient.</p>
                <p className="text-white text-sm md:text-4xl text-center align-middle" style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 1)' }}>Easily rent clothes from one place for all your colder or hotter travel destinations!</p>
            </div>

            <div className="sub-container">
                <div className="grid md:grid-cols-3 gap-30 md:mt-24">
                    <div className="flex flex-col items-center text-center">
                        <img src="/src/assets/icons/cursor-hand.svg" className="icon-size "/>
                        <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">RENT</h1>
                        <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Rent a clothing item like a jacket in the destination you're traveling to</p>
                    </div>
                        
                    <div className="flex flex-col items-center text-center">
                        <img src="/src/assets/icons/rain-jacket.png" className="icon-size"/>
                        <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">WEAR</h1>
                        <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Dress warm in style and within your travel budget</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <img src="/src/assets/icons/arrows.png" className="icon-size"/>
                        <h1 className="text-center font-bold text-white text-shadow md:text-2xl my-3">RETURN</h1>
                        <p className="text-center text-white text-shadow mt-3 text-xs  sm:text-base md:text-xl md:w-[80%]">Relieves the hassle of packing heavy</p>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <section className="homepage-3 rounded-xl">
        <div className="title text-white font-bold md:text-6xl text-center">Why Use RentAway?</div>
    
        <div className="container h-screen w-full flex flex-col justify-center">
            <div className="columns-2 align-middle">
                <div className="gap-40 flex flex-col items-center justify-center">
                    <div className="mb-auto">Row1</div>
                    <div>Row2</div>
                </div>

                <div className="gap-40 flex flex-col items-center justify-center">
                    <div className="mb-auto">Row11</div>
                    <div>Row22</div>
                </div>
            </div>
        </div>

    </section>
    </>

        
    )
}