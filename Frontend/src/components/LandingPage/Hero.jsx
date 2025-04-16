import React from 'react';
import collage from '../../assets/collage2.jpg'
function Hero(props) {
    return (
        <div className='border-2  '>
            <img src={collage} alt="" className='object-cover' />
            
        </div>
    );
}

export default Hero;