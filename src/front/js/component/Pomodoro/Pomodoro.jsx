import React, { useState } from "react";
import { iconsImgs } from "../../utils/images.js";
import Timer from "./Timer.js";
import Settings from "./Settings.js";
import SettingsContext from "./SettingsContext.js";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className="pomodoro-container subgrid-two-item grid-common grid-c8">
      <div className="grid-c8-content">
        <div className="text text-silver-v1">
          {/* {" "} */}
          <main>
            <SettingsContext.Provider
              value={{
                showSettings,
                setShowSettings,
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
              }}
            >
              {showSettings ? <Settings /> : <Timer />}
            </SettingsContext.Provider>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
