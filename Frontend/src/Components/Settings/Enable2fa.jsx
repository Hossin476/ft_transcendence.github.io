import { CgCopy } from "react-icons/cg";
// import qrcode from '../../../public/avatar/qrcode.png';
import {useTranslation} from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

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
    const { t } = useTranslation();
    const { tokens, customFetch } = useAuth();
    const [Qrcode, setQrCode] = useState("");
    const [SecretKey, setSecretKey] = useState("");
    
    const setup_2fa = async () => {
      try {
        const response = await customFetch(`/api/users/setup-2fa/`, {
          method: "GEt",
          headers: {
            Authorization: "JWT " + tokens.access,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setQrCode(data.qr_code);
          setSecretKey(data.secret_key);
        } else {
          console.log("error");
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      setup_2fa();
    }, []);
    
  
    return (
      <div className="mid-nav">
        <div className="number1-nav ">
            <div className="icon-left">
                <CircleIcon iconText='1'/>
                <div className="verline"></div>
            </div>
            <div className="pp">
                <p>
                    {t("qr_instructions")}
                </p>
                <div className="flex gap-3 items-center">
                    <p className="code">{SecretKey}</p>
                    <span className="text-sm cursor-pointer hover:text-gray-400">
                    <CgCopy
                      onClick={() => navigator.clipboard.writeText(SecretKey)}
                    />
                    </span>
                </div>
            </div>
              <img src={Qrcode} alt="QR code" className="lg:w-[110px] lg:h-[110px] xsm:w-[10vw] xsm:h-[10vw]"/>
        </div>
        <div className="number2-nav">
            <div className="icon-left">
                <CircleIcon iconText='2'/>
            </div>
            <p>{t("confirmation_code")}</p>
        </div>
    </div>
    )
  }
  
  export default Mid_Nav_enable;
