import AnimationE from "../Components/Settings/AnimationE";
import AnimationD from "../Components/Settings/AnimationD";
import Mid_Nav_disable from "../Components/Settings/Disable2fa";
import Mid_Nav_enable from "../Components/Settings/Enable2fa";
import LanguageSwitcher from "../Components/Settings/LanguageSwitcher";
import ProfileSettings from "../Components/Settings/ProfileSettings";
import "../Components/Settings/Disable2fa.css";
import "../Components/Settings/Enable2fa.css";
import "../Components/Settings/Settings.css";
import { useState } from "react";
import AuthCode from "react-auth-code-input";
import { PiWarningCircleBold } from "react-icons/pi";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

function Tittle() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("Account settings")}</h1>
    </>
  );
}

function Header({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  return (
    <div className="settings-header">
      <button 
        className={`myprofile ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
      >
        {t("MY PROFILE")}
      </button>
      <button 
        className={`settings ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => setActiveTab('settings')}
      >
        {t("SETTINGS")}
      </button>
    </div>
  );
}

function InputQrCode({ result, setResult, IsNotCorrect, setNotCorrect }) {

  const handleOnChange = (res) => {
    setResult(res);
    setNotCorrect(false);
  };

  return (
    <AuthCode
      containerClassName="input-holder"
      inputClassName={IsNotCorrect ? "input-error" : "input"}
      allowedCharacters="numeric"
      // onKeyDown={handleKeyDown}
      onChange={handleOnChange}
    />
  );
}

function Title_section({ Title }) {
  return (
    <div className="up-nav">
      <h1>{Title}</h1>
    </div>
  );
}

function Button_section({ Name, handleClick }) {
  const { t } = useTranslation();
  return (
    <div className="button-section">
      <button className="cancel">{t("Cancel")}</button>
      <button onClick={handleClick} className="enable">
        {Name}
      </button>
    </div>
  );
}

function TwofaSetD({ SetEnable, IsEnable, setAnimation }) {
  const [result, setResult] = useState();
  const [IsNotCorrect, setNotCorrect] = useState(false);
  const { t } = useTranslation();
  const { tokens } = useAuth();

  const Disable_2fa = async () => {
    try {
      const response = await fetch(`/api/users/setup-2fa/`, {
        method: "DELETE",
        headers: {
          Authorization: "JWT " + tokens.access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: result,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        SetEnable(false);
      } else {
        console.log("error");
        setNotCorrect(true);
      }
    }
    catch (error) {
      console.log(error);
      setNotCorrect(true);
    } 
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Disable_2fa();
    }
  };

  function handleClick() {
    Disable_2fa();
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
    <div className="settings-2fa">
      <div className="tittle-section2">
        <Title_section Title={t("Disable Two-factor Authentication")} />
        <Mid_Nav_disable />
      </div>
      <div className="input-section2">
        <InputQrCode
          result={result}
          setResult={setResult}
          IsNotCorrect={IsNotCorrect}
          setNotCorrect={setNotCorrect}
          onKeyDown={handleKeyDown}
        />
        <div className="warning-text">
          <PiWarningCircleBold color="#E33838" size={"2vw"} />
          <p>{t("logout_message")}</p>
        </div>
      </div>
      <Button_section Name={t("Disable")} handleClick={handleClick} />
      {!IsEnable ? <Save_animation Status={false} /> : null}
    </div>
  );
}

function Save_animation({ Status }) {
  return (
    <div className="animation">{Status ? <AnimationE /> : <AnimationD />}</div>
  );
}

function TwofaSetE({ SetEnable, IsEnable, setAnimation }) {
  const [result, setResult] = useState();
  const [IsNotCorrect, setNotCorrect] = useState(false);
  const { t } = useTranslation();
  const { tokens } = useAuth();


  const Setup_2fa = async () => {
    try {
      const response = await fetch(`/api/users/setup-2fa/`, {
        method: "POST",
        headers: {
          Authorization: "JWT " + tokens.access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: result,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        SetEnable(data.two_factor_enabled);
      } else {
        console.log("error");
        SetEnable(false);
        setNotCorrect(true);
      }
    }
    catch (error) {
      console.log(error);
      SetEnable(false);
      setNotCorrect(true);
    }
  }

  const handleKeyDown = (e) => {
    console.log("fafsf", e.key);
    if (e.key === "Enter") {
      Setup_2fa();
    }
  };

  function handleClick() {
    Setup_2fa();
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
      <div className="settings-2fa">
        <div className="tittle-section">
          <Title_section Title={t("Enable Two-factor Authentication")} />
          <Mid_Nav_enable />
        </div>
        <div className="input-section">
          <InputQrCode
            result={result}
            setResult={setResult}
            IsNotCorrect={IsNotCorrect}
            setNotCorrect={setNotCorrect}
            onKeyDown={handleKeyDown}
          />
          <div className="warning-text">
            <PiWarningCircleBold color="#E33838" size={"2vw"} />
            <p>{t("logout_message")}</p>
          </div>
        </div>
        <Button_section Name={t("Enable")} handleClick={handleClick} />
        {IsEnable ? <Save_animation Status={true} /> : null}
      </div>
    </>
  );
}

function Two2fa() {
  const { tokens } = useAuth();
  const [IsEnable, SetEnable] = useState(false);
  const [Isanimation, setAnimation] = useState(false);

  const get_2fa = async () => {
    try {
      const response = await fetch(`/api/users/check-2fa/`, {
        method: "GET",
        headers: {
          Authorization: "JWT " + tokens.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        SetEnable(data.two_factor_enabled);
      } else {
        console.log("error");
        SetEnable(false);
      }
    }
    catch (error) {
      console.log(error);
      SetEnable(false);
    }
  };

  useEffect(() => {
    get_2fa();
  }, []);

  return (
    <>
        {Isanimation ? (
          <TwofaSetD
            SetEnable={SetEnable}
            IsEnable={IsEnable}
            setAnimation={setAnimation}
          />
        ) : (
          <TwofaSetE
            SetEnable={SetEnable}
            IsEnable={IsEnable}
            setAnimation={setAnimation}
          />
        )}
    </>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="holder-container">
      <div className="settings-tittle">
        <Tittle />
      </div>
      <div className="settings-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'settings' ? (
          <Two2fa />
        ) : (
          <ProfileSettings />
        )}
      </div>
    </div>
  );
}

export default Settings;
