import React from 'react'
import Lottie from 'react-lottie';
import animationData from './animation.json'

export default class LottieControl extends React.Component {
    render() {
  
      const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
      };
  
      return(
        <Lottie options={defaultOptions}
                height={200}
                width={200}
        />
      )
    }
  }