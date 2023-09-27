export const HomepageThird = () => {
    return (
        <section className="homepage-3 rounded-xl h-screen w-full">
        <div className="title text-white font-bold text-2xl md:text-6xl text-center text-shadow lg:relative top-20">Why Use RentAway?</div>

      
           <div className="h-screen flex md:gap-40">
               <div className="mx-auto flex items-center md:justify-end">

                  <div className="first-left-homepage w-1/2">
                       <div className="flex mb-20">
                           <div>
                               <h2 className="text-sm md:text-xl font-bold text-left text-white text-shadow">Many Styles of Clothes</h2>
                               <p className="text-xs  md:text-sm mb-4 text-white text-shadow">We can fit you with the perfect jacket for any temperature or weather condition</p>
                               <div className="flex justify-center">
                                    <img src="src/assets/icons/jacket_icon.png" width="75px" height="75px" alt="Jacket Icon" className="invisible lg:visible"></img>
                                </div>
                           </div>  
                          
                       </div>
                           
                      <div className="flex">
                          <div>
                              <h2 className="text-sm md:text-xl font-bold text-left text-white text-shadow">Best Brands in the Industry</h2>
                              <p className="text-xs  md:text-sm mb-4 text-white text-shadow"> Reliable brands that have been in the industry. Our clothes are guaranteed to keep you warm.</p>
                              <div className="flex justify-center">
                              <img src="src/assets/icons/star.png" width="75px" height="75px" alt="Star Icon" className="invisible lg:visible"></img>
                          </div>
                          </div>  
                     
                           
                       </div>
                  
                  </div>
              </div>

              <div className="mx-auto flex items-center justify-end md:justify-start">

                  <div className="first-left-homepage w-1/2">
                       <div className="flex mb-20">
                           <div>
                               <h2 className="text-sm md:text-xl font-bold text-left text-white text-shadow">Rent Fully Insured</h2>
                               <p className="text-xs  md:text-sm mb-3 text-white text-shadow">Any damages to the clothing are fully insured.</p>
                               <div className="flex justify-center">
                                    <img src="src/assets/icons/firewallshield.png" width="75px" height="75px" alt="Shield Icon" className="invisible lg:visible"></img>
                                </div>
                           </div>  
                          
                       </div>
                           
                      <div className="flex">
                          <div>
                              <h2 className="text-sm md:text-xl font-bold text-left text-white text-shadow">Longest Opening Hours</h2>
                              <p className="text-xs  md:text-sm mb-4 text-white text-shadow"> Rent it for the whole duration of your trip. Return it without any hassle at any time of the day.</p>
                              <div className="flex justify-center">
                              <img src="src/assets/icons/clock.png" width="75px" height="75px" alt="Clock Icon" className="invisible lg:visible"></img>
                          </div>
                          </div>  
                     
                           
                       </div>
                  
                  </div>
              </div>
              
      
            </div>
       
    </section>
    )
    
}