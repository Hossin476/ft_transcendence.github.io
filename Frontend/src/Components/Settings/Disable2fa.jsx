import './Disable2fa.css';
import './Enable2fa.css';
import './Settings.css';
import {useTranslation} from 'react-i18next';

function CircleIcon( {iconText}){
    return (
        <div className="icon-container">
            <div className="circle-icon">
                <span className="icon-text">{iconText}</span>
            </div>
        </div>
    );
}

function Mid_Nav_disable(){
    const { t } = useTranslation();
    return (
        <div className="mid-nav2">
            <div className="number1-nav2">
                <div className="icon-left2">
                    <CircleIcon iconText='1'/>
                    <div className="verline2"></div>
                </div>
                <div className="pp2">
                    <p>
                        {t("disable_2fa_confirmation")}
                    </p>
                </div>

            </div>
            <div className="number2-nav2">
                <CircleIcon iconText='2'/>
                <p>{t("confirmation_code")}</p>
            </div>
        </div>
    )
}

export default Mid_Nav_disable;