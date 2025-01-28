

import { Link } from "react-router-dom";

import banner from '../../assets/cover.png'
import Container from "../Shared/Container";
const Banner = () => {
    return (
      <Container>
          <div className='
        
        bg-no-repeat  bg-cover h-[700px] relative flex flex-col items-center justify-center *:text-white space-y-3 *:text-center' 
       style={{
           backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7259278711484594) 61%, rgba(0,0,0,0) 96%), url(${banner})`, // Add your banner image URL here
         }}>
        
         <h3 className="text-4xl font-medium">Find Your Dream Home Today! 🌟</h3>
            <h2 className="text-6xl font-medium">Explore Thousands of Properties with Trusted Agents</h2>
            <p>Buy, Sell, Manage – All in One Place! 🏠</p>
            <Link to= '/allProperties' className="text-lg font-bold btn btn-outline btn-accent">Explore All Property</Link>
         </div>
      </Container>
      
    );
};

export default Banner;