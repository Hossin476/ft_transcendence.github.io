import { CgCopy } from "react-icons/cg";
import qrcode from '../../public/avatar/qrcode.png';
import { useState } from "react";
import AuthCode from "react-auth-code-input";
import { PiWarningCircleBold } from "react-icons/pi";


import './Settings.css';

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

function CircleIcon( {iconText}){
    return (
        <div className="icon-container">
            <div className="circle-icon">
                <span className="icon-text">{iconText}</span>
            </div>
        </div>
    );
}

function Verline(){
    return (
        <div className="verline"></div>
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

function TwofaDisable(){
    return (
        <div className='settings-2fa'>
            <div className='tittle-section'>
                    <div className="up-nav">
                        <h1>Disable Two-factor Authentication</h1>
                    </div>
                    <div className="mid-nav">
                        <div className="number1-nav ">
                            <div className="icon-left">
                                <CircleIcon iconText='1'/>
                                <Verline />
                            </div>
                            <div className="pp">
                                <p>
                                Are you sure you want to disable two-factor authentication?
                                Disabling 2FA will remove an extra layer of security from your account. 
                                </p>
                                {/* <div className="flex gap-3 items-center">
                                    <p className="code">Y77CFN2D76BJLBTBKKN3YHNWR</p>
                                    <CgCopy />
                                </div> */}
                            </div>
                                <img src={qrcode} alt="QR code" className="lg:w-[116px] lg:h-[116px] xsm:w-[10vw] xsm:h-[10vw]"/>
                        </div>
                        <div className="number2-nav">
                            <CircleIcon iconText='2'/>
                            <p>Enter the 6 figure confirmation code shown on the app:</p>
                        </div>
                    </div>
            </div>
            <div className='input-section'>
                <InputQrCode />
                <div className="warning-text">
                    <PiWarningCircleBold color="#E33838" size={"2vw"}/>
                    <p>You will be logged out from all your devices and browsers that have been used to log in to your account recently for security reasons.</p>
                </div>
            </div>
            <div className='button-section'>
                <button className='cancel'>Cancel</button>
                <button className='enable'>Disable</button>
            </div>
        </div>
    );
}

function Disable2fa(){
    return(
        <div className="holder-container">
        <div className='settings-tittle'>
            <Tittle />
        </div>
        <div className="settings-container">
            <Header/>
            <TwofaDisable />
        </div>
    </div>
    )
}

export default Disable2fa;