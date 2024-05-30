import React, { useContext } from 'react';
import myContext from '../context/myContext'; 

const HeroSection = () => {
  const { toggleMode, mode } = useContext(myContext);

  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const redirectUrl = user ? '/explore' : '/login';

  return (
    <main 
      
      style={{
        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-20 text-center lg:text-left ">
        <div className="max-w-full lg:max-w-[50%] mt-40 lg:mt-40 lg:ml-20">
          <h2 className={`text-4xl lg:text-5xl font-cursive mb-4 leading-tight lg:leading-snug ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
            Introducing the <br /> Virtual Dressing Room
          </h2>
          <p className={`text-xl lg:text-2xl font-cursive mb-8 leading-relaxed lg:leading-loose ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Offer you a truly unique and personalized shopping experience
          </p>
          <a href={redirectUrl}>
            <button className="px-8 py-3 text-lg text-black bg-gold rounded-lg transition-colors duration-300 hover:bg-gray-700 hover:text-white">
              Get Started
            </button>
          </a>
        </div>
        <img
        //  src="https://www.looklet.com/hs-fs/hubfs/hero-small-frames-fast.webp?width=1050&height=1026&name=hero-small-frames-fast.webp"
          src ="./src/assets/heroimg.jpg"
          alt="Hero Image"
          className="max-w-full lg:max-w-[40%] h-auto rounded-lg shadow-lg ml-0 lg:ml-8 mt-8 lg:mt-0"
        />
      </div>
    </main>
  );
};

export default HeroSection;
