import React from 'react'
import Lottie from 'react-lottie';
import Enable from '../../../public/Enable.json';


const AnimationE = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Enable,
    };
  
    return (
        <Lottie options={defaultOptions}
                height={200}
                width={200}
        />
    )
}

export default AnimationE;