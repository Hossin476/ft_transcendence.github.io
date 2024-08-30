import React from 'react'
import Lottie from 'react-lottie';
import Disable from '../../../public/Disable.json';

const AnimationD = ({Status}) => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Disable,
    };
  
    return (
        <Lottie options={defaultOptions}
                height={200}
                width={200}
        />
    )
}

export default AnimationD;