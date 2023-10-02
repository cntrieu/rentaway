import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { HomepageSecond } from "../components/homepageSecond";
import { HomepageThird } from "../components/homepageThird";

export const Home = () => {
    return (
        <>
    <section className="h-screen w-full homepage-1 rounded-xl flex flex-col items-center justify-center">
     
            <div className="text-white font-bold md:text-4xl lg:text-4xl text-center align-middle mb-3 text-shadow" >Travel On A Budget</div>
            <Link to={'/clothing'} className="hover-opacity border rounded-full text-md py-2 px-4 text-white">Rent Today</Link>
    </section>

    {/* <HomepageSecond />
    <HomepageThird /> */}
    </>

        
    )
}