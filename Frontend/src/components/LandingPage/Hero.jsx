import React from 'react';
import collage from '../../assets/collage2.jpg'
import { useAuth } from '../../contexts/authContext';

function Hero(props) {
    const { currentUser, userLoggedIn } = useAuth();

    return (
        <div className='border-2  '>
            <img src={collage} alt="" className='object-cover' />
            {userLoggedIn && currentUser?.displayName}
        </div>
    );
}

export default Hero;