import React from 'react'
import Lottie from 'react-lottie';
import animationData from './animation.json'

export default class LottieControl extends React.Component {

    constructor(props) {
      super(props);
      this.state = {isStopped: false, isPaused: false};
    }
  
    render() {
      const buttonStyle = {
        display: 'block',
        margin: '10px auto'
      };
  
      const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  
      return <div style={{border: "1px solid white", width: "100%", zIndex: 1}}>
        <Lottie options={defaultOptions}
                height={400}
                width={400}
        />
      </div>
    }
  }