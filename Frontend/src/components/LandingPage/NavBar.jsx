
import React from 'react';

function NavBar(props) {
    return (

        //  navbar with login button, row display
        <div className='w-[100vw] p-[35px]  min-h-[80px] border-0 border-black  flex bg-gradient-to-b from-black/100 to-transparent h-full absolute   '>

            <div className=" ml-[2vw] font-black text-3xl text-dark-purple">
                SceneIT
            </div>


            <div className=" ml-auto mr-[2vw] font-extrabold border-0 p-3 rounded-[10px] text-gray-100 hover:bg-white/[.2] duration-[.3s] h-fit">
                LOG IN
            </div>
            
        </div>
    );
}

export default NavBar;