import Enable2fa from "./Enable2fa";
import Lottie from 'lottie-react';
// import animationDatta from './animation.json'

import LottieControl from './Animation';
import Mid_Nav_disable from './Disable2fa';
import Mid_Nav_enable from './Enable2fa';


import './Disable2fa.css';
import './Enable2fa.css';
import './Settings.css';
import { useState } from "react";
import AuthCode from "react-auth-code-input";
import { PiWarningCircleBold } from "react-icons/pi";


function Tittle(){
    return (
        <>
            <h1>Account settings</h1>
        </>
    );
}

function Header(){
    return (
        <div className='settings-header'>
            <button className='myprofile'>MY PROFILE</button>
            <button className='settings'>SETTINGS</button>
        </div>
    );
}

function InputQrCode(){

    const [result, setResult] = useState();

    const handleOnChange = (res) => {
      setResult(res);
    };

    console.log(result);
    return <AuthCode containerClassName="input-holder" inputClassName="input" 
                     allowedCharacters='numeric' onChange={handleOnChange} />;
}

function Title_section({Title}){
  return (
    <div className="up-nav">
      <h1>{Title}</h1>
    </div>
  );
}

function Button_section({Name}){
  return(
    <div className='button-section'>
      <button className='cancel'>Cancel</button>
      <button className='enable'>{Name}</button>
    </div>
  )
}

function TwofaSetD(){
  return (
      <div className='settings-2fa'>
          <div className='tittle-section2'>
                  <Title_section Title={"Disable Two-factor Authentication"} />
                  <Mid_Nav_disable />
          </div>
          <div className='input-section2'>
              <InputQrCode />
              <div className="warning-text">
                  <PiWarningCircleBold color="#E33838" size={"2vw"}/>
                  <p>You will be logged out from all your devices and browsers that have been used to log in to your account recently for security reasons.</p>
              </div>
          </div>
          <Button_section Name={"Disable"}/>
      </div>
  );
}

function  Save_animation(){
  return (
    <div className="animation">
      <LottieControl />
    </div>
  )
}

function TwofaSetE(){
  return (
    <>
      <div className='settings-2fa'>
          <div className='tittle-section'>
                  <Title_section Title={"Enable Two-factor Authentication"} />
                  <Mid_Nav_enable />
                  </div>
                  <div className='input-section'>
                  <InputQrCode />
                  <div className="warning-text">
                  <PiWarningCircleBold color="#E33838" size={"2vw"}/>
                  <p>You will be logged out from all your devices and browsers that have been used to log in to your account recently for security reasons.</p>
                  </div>
          </div>
                <Button_section Name={"Enable"}/>
          <Save_animation />
      </div>
      </>
  );
}

function Two2fa(){
  return (
    <div className="holder-container">
      <div className='settings-tittle'>
          <Tittle />
      </div>
      <div className="settings-container">
          <Header/>
          <TwofaSetE />
          {/* <TwofaSetD /> */}
      </div>
    </div>
  )
}

function Settings() {
  
  return (
    // <Enable2fa />
    <Two2fa />
    // <LottieControl />
  );
}

export default Settings;