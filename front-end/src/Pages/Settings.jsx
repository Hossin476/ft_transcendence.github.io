import { Bs1CircleFill } from "react-icons/bs";
import { CgCopy } from "react-icons/cg";
import './Settings.css';
import qrcode from '../../public/avatar/qrcode.png';

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
function Twofa(){
    return (
        <div className='settings-2fa'>
            <div className='tittle-section'>
                    <div className="up-nav">
                        <h1>Two-factor authentication</h1>
                    </div>
                    <div className="mid-nav">
                        <div className="number1-nav ">
                            <div className="icon-left">
                                <CircleIcon iconText='1'/>
                                <Verline />
                            </div>
                            <div className="pp">
                                <p>
                                    Scan the QR code using any authentication 
                                    application on your phone (e.g. Google
                                    Authenticator, Duo Mobile, Authy) or enter 
                                    the following code:
                                </p>
                                <div className="flex gap-3 items-center">
                                    <p className="code">dhjsahjkdhajkshdjkahsdjkhsajkdhk</p>
                                    <CgCopy />
                                </div>
                            </div>
                                <img src={qrcode} alt="QR code" className="lg:w-[116px] lg:h-[116px] xsm:w-[10vw] xsm:h-[10vw]"/>
                        </div>
                        <div className="number2-nav">
                            <CircleIcon iconText='2'/>
                            <p>Enter the 6 figure confirmation code shown on the app:</p>
                        </div>
                        {/* <div className="left-nav">
                            <CircleIcon iconText='1'/>
                            <Verline />
                            <CircleIcon iconText='2'/>
                        </div>
                        <div className="text-2fa">
                            <p>Scan the QR code using any authentication application on your phone (e.g. Google Authenticator, Duo Mobile, Authy) or enter the following code:</p>
                            <p>Y77CFN2D76BJLBTBKKN3YHNWRWDWGYFNL</p>
                            <p>Enter the 6 figure confirmation code shown on the app:</p>
                        </div>
                        <div className="img-2fa">
                            <img src="https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/2FA%20Example:example%40example.com%3Fsecret%3DY77CFN2D76BJLBTBKKN3YHNWRWDWGYFNL%26issuer%3D2FA%2520Example" alt="QR code"/>
                        </div> */}
                    </div>
            </div>

            <div className='input-section'>
                <p>input code</p>
            </div>

            <div className='button-section'>
                <p>button section</p>
            </div>
        </div>
    );
}

function Settings() {
  return (
    <div className="holder-container">
        <div className='settings-tittle'>
            <Tittle />
        </div>
        <div className="settings-container">
            <Header/>
            <Twofa />
        </div>
    </div>
  );
}

export default Settings;