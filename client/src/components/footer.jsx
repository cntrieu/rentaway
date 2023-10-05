
export const Footer = () => {
    return (
    
        <div className="">
            <footer className="border bg-stone-100 flex justify-center p-3">
               {/* <div className="">© 2023 CT - This website is for demo purposes.</div> */}
               <div className="flex">
                <a href="https://www.linkedin.com/in/calvin-trieu/" className="m-1">
                    <img src="/LI-In-Bug.png" className="w-9"/>
                </a>

                <a href="https://github.com/cntrieu" className="m-1">
                    <img src="/github-mark.png" className="w-8"/>
                </a>
               </div>
     
            </footer>        
        </div>
    )
}