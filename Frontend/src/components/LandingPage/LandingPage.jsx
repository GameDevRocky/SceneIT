import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';

function LandingPage(props) {
    return (
        <div>
            <div className="bg-gradient-to-b from-black/95 to-transparent max-h-[550px] overflow-hidden">
                <NavBar/>
                <Hero/>
            </div>

            
            
            
        </div>
    );
}

export default LandingPage;