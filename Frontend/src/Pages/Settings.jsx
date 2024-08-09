
import AnimationE from '../Components/Settings/AnimationE';
import AnimationD from '../Components/Settings/AnimationD';
import Mid_Nav_disable from '../Components/Settings/Disable2fa';
import Mid_Nav_enable from '../Components/Settings/Enable2fa';


import '../Components/Settings/Disable2fa.css';
import '../Components/Settings/Enable2fa.css';
import '../Components/Settings/Settings.css';
import { useState } from "react";
import AuthCode from "react-auth-code-input";
import { PiWarningCircleBold } from "react-icons/pi";
import { useEffect } from 'react';

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

function InputQrCode({result, setResult, IsNotCorrect, setNotCorrect}) {

    const handleOnChange = (res) => {
      setResult(res);
      setNotCorrect(false);
    };

    return <AuthCode containerClassName="input-holder" inputClassName={IsNotCorrect ? 'input-error' : 'input'} 
                     allowedCharacters='numeric' onChange={handleOnChange} />;
}

function Title_section({Title}){
  return (
    <div className="up-nav">
      <h1>{Title}</h1>
    </div>
  );
}

function Button_section({Name, handleClick}){

  return(
    <div className='button-section'>
        <button className='cancel'>Cancel</button>
        <button onClick={handleClick} className='enable'>{Name}</button>
    </div>
  )
}

function TwofaSetD({SetEnable , IsEnable, setAnimation}){

  const [result, setResult] = useState();
  const [IsNotCorrect, setNotCorrect] = useState(false);


  function handleClick(){
    if (result == '000000'){
      SetEnable(false);
    }
    else
      setNotCorrect(true);
  }

  useEffect(() => {
    if (IsEnable == false) {
      const timer = setTimeout(() => {
        setAnimation(false);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [IsEnable]);

  return (
      <div className='settings-2fa'>
          <div className='tittle-section2'>
                  <Title_section Title={"Disable Two-factor Authentication"} />
                  <Mid_Nav_disable />
          </div>
          <div className='input-section2'>
              <InputQrCode  result={result} setResult={setResult} IsNotCorrect={IsNotCorrect} setNotCorrect={setNotCorrect} />
              <div className="warning-text">
                  <PiWarningCircleBold color="#E33838" size={"2vw"}/>
                  <p>You will be logged out from all your devices and browsers that have been used to log in to your account recently for security reasons.</p>
              </div>
          </div>
          <Button_section Name={"Disable"} handleClick={handleClick}/>
          {
              !IsEnable ? <Save_animation Status={false} /> : null
          }
      </div>
  );
}

function  Save_animation({Status}){
  return (
    <div className="animation">
      {
        Status ? <AnimationE /> : <AnimationD />
      }
    </div>
  )
}

function TwofaSetE({SetEnable , IsEnable, setAnimation}){

  const [result, setResult] = useState();
  const [IsNotCorrect, setNotCorrect] = useState(false);


  function handleClick(){
    if (result == '000000'){
      SetEnable(true);
    }
    else
      setNotCorrect(true);
  }

  useEffect(() => {
    if (IsEnable) {
      const timer = setTimeout(() => {
        setAnimation(true);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [IsEnable]);

  return (

    <>
      <div className='settings-2fa'>
          <div className='tittle-section'>
                  <Title_section Title={"Enable Two-factor Authentication"} />
                  <Mid_Nav_enable />
                  </div>
                  <div className='input-section'>
                  <InputQrCode  result={result} setResult={setResult} IsNotCorrect={IsNotCorrect} setNotCorrect={setNotCorrect} />
                  <div className="warning-text">
                  <PiWarningCircleBold color="#E33838" size={"2vw"}/>
                  <p>You will be logged out from all your devices and browsers that have been used to log in to your account recently for security reasons.</p>
                  </div>
          </div>
            <Button_section Name={"Enable"} handleClick={handleClick}/>
            {
              IsEnable ? <Save_animation Status={true} /> : null
            }
      </div>
      </>
  );
}

function Two2fa(){
  const [IsEnable, SetEnable] = useState(false);
  const [Isanimation, setAnimation] = useState(false);

  return (
    <div className="holder-container">
      <div className='settings-tittle'>
          <Tittle />
      </div>
      <div className="settings-container">
          <Header/>
          {
            Isanimation ? <TwofaSetD SetEnable={SetEnable} IsEnable={IsEnable} setAnimation={setAnimation}  /> : <TwofaSetE SetEnable={SetEnable} IsEnable={IsEnable} setAnimation={setAnimation} />
          }
      </div>
    </div>
  )
}

function Settings() {
  
  return (
    <Two2fa />
  );
}

export default Settings;