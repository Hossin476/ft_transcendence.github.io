import React from "react";
import { FaCheck } from "react-icons/fa";

function CostumizePing( {setIsPopupOpen} ) {

    const [settings, setSettings] = React.useState(() => {
      const savedSettings = localStorage.getItem("PingSettings");
      return savedSettings
        ? JSON.parse(savedSettings)
        : { Paddle: "white", Ball: "white" };
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
      localStorage.setItem("PingSettings", JSON.stringify(settings));
      setIsPopupOpen(false);
    }
  
    const UpdateSetting = (key, value) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [key]: value,
      }));
    }
  
    return (
      <div className="grid gap-4 py-4">
        <div className="bg-[#21162C] border border-gray-400 rounded-lg p-6">
          <div className="space-y-6">
            {/* Paddle Customization */}
            <div className="space-y-4">
              <span className="text-white">Paddle Color</span>
              <div className="flex gap-3 flex-wrap" id="paddle-color">
                {colorOptions.map((color) => (
                  <button
                    key={`paddle-${color}`}
                    className="w-10 h-10 rounded-lg relative"
                    style={{ backgroundColor: color }}
                    onClick={() => UpdateSetting("Paddle", color)}
                    aria-label={`Select ${color} for paddle color`}
                  >
                    {settings.Paddle === color && (
                      <FaCheck className="absolute inset-0 m-auto text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Ball Customization */}
            <div className="space-y-4">
              <span className="text-white">Ball Color</span>
              <div className="flex gap-3 flex-wrap" id="ball-color">
                {colorOptions.map((color) => (
                  <button
                    key={`ball-${color}`}
                    className="w-10 h-10 rounded-lg relative"
                    style={{ backgroundColor: color }}
                    onClick={() => UpdateSetting("Ball", color)}
                    aria-label={`Select ${color} for ball color`}
                  >
                    {settings.Ball === color && (
                      <FaCheck className="absolute inset-0 m-auto text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Preview */}
            <div className="mt-8">
              <h3 className="text-white">Preview</h3>
              <div className="bg-[#21162C] rounded-lg p-6 mt-2">
                <div className="relative h-40 border border-gray-400 rounded">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-16 rounded"
                    style={{ backgroundColor: settings.Paddle }}
                  />
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-16 rounded"
                    style={{ backgroundColor: settings.Paddle }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                    style={{ backgroundColor: settings.Ball }}
                  />
                </div>
              </div>
            </div>
          
            {/* Save Button */}
            <button
              onClick={saveSettings}
              className="w-full mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

export default CostumizePing;