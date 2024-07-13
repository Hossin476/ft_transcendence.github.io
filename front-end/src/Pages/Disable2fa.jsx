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

function Mid_Nav_disable(){
    return (
        <div className="mid-nav2">
            <div className="number1-nav2">
                <div className="icon-left2">
                    <CircleIcon iconText='1'/>
                    <div className="verline2"></div>
                </div>
                <div className="pp2">
                    <p>
                    Are you sure you want to disable two-factor authentication?
                    Disabling 2FA will remove an extra layer of security from your account. 
                    </p>
                </div>

            </div>
            <div className="number2-nav2">
                <CircleIcon iconText='2'/>
                <p>Enter the 6 figure confirmation code shown on the app:</p>
            </div>
        </div>
    )
}

export default Mid_Nav_disable;