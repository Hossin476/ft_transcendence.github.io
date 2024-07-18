import { CgCopy } from "react-icons/cg";
import qrcode from '../../../public/avatar/qrcode.png';

import './Disable2fa.css';
import './Enable2fa.css';
import './Settings.css';

function CircleIcon( {iconText}){
    return (
        <div className="icon-container">
            <div className="circle-icon">
                <span className="icon-text">{iconText}</span>
            </div>
        </div>
    );
}

function Mid_Nav_enable(){
    return (
        <div className="mid-nav">
        <div className="number1-nav ">
            <div className="icon-left">
                <CircleIcon iconText='1'/>
                <div className="verline"></div>
            </div>
            <div className="pp">
                <p>
                    Scan the QR code using any authentication 
                    application on your phone (e.g. Google
                    Authenticator, Duo Mobile, Authy) or enter 
                    the following code:
                </p>
                <div className="flex gap-3 items-center">
                    <p className="code">Y77CFN2D76BJLBTBKKN3YHNWR</p>
                    <CgCopy />
                </div>
            </div>
                <img src={qrcode} alt="QR code" className="lg:w-[116px] lg:h-[116px] xsm:w-[10vw] xsm:h-[10vw]"/>
        </div>
        <div className="number2-nav">
            <CircleIcon iconText='2'/>
            <p>Enter the 6 figure confirmation code shown on the app:</p>
        </div>
    </div>
    )
}

export default Mid_Nav_enable;