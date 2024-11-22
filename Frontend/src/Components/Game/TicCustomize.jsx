import React from "react";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function CustomizeTic({ setIsPopupOpen }) {
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState(() => {
    const savedSettings = localStorage.getItem("TicSettings");
    return savedSettings ? JSON.parse(savedSettings) : { X: "green", O: "red" };
  });

  const colorOptions = [
    "white",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
  ];

  const saveSettings = () => {
    localStorage.setItem("TicSettings", JSON.stringify(settings));
    setIsPopupOpen(false);
  };

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="bg-[#21162C] border border-gray-400 rounded-lg p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="text-white">{t("Player X Color")}</span>
            <div className="flex gap-3 flex-wrap" id="player-x-color">
              {colorOptions.map((color) => (
                <button
                  key={`player-x-${color}`}
                  className="w-10 h-10 rounded-lg relative"
                  style={{ backgroundColor: color }}
                  onClick={() => updateSetting("X", color)}
                  aria-label={`Select ${color} for Player X`}
                >
                  {settings.X === color && (
                    <FaCheck className="absolute inset-0 m-auto text-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-white">{t("Player O Color")}</span>
            <div className="flex gap-3 flex-wrap" id="player-o-color">
              {colorOptions.map((color) => (
                <button
                  key={`player-o-${color}`}
                  className="w-10 h-10 rounded-lg relative"
                  style={{ backgroundColor: color }}
                  onClick={() => updateSetting("O", color)}
                  aria-label={`Select ${color} for Player O`}
                >
                  {settings.O === color && (
                    <FaCheck className="absolute inset-0 m-auto text-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-white">{t("Preview")}</h3>
            <div className="bg-[#21162C] rounded-lg p-6 mt-2">
              <div className="grid grid-cols-3 gap-2 w-40 h-40 mx-auto">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 flex items-center justify-center text-3xl font-bold"
                  >
                    {index % 2 === 0 ? (
                      <span style={{ color: settings.X }}>X</span>
                    ) : index === 1 ? (
                      <span style={{ color: settings.O }}>O</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={saveSettings}
            className="w-full mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {t("Save")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomizeTic;
