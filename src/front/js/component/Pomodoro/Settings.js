import ReactSlider from "react-slider";
import "./slider.css";
import SettingsContext from "./SettingsContext";
import React, { useContext } from "react";
import BackButton from "./BackButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div className="settings-container" style={{ textAlign: "left" }}>
      <div className="sliders-back">
        <label>work: {settingsInfo.workMinutes}:00</label>
        <ReactSlider
          className={"slider"}
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.workMinutes}
          onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />
        <label>break: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
          className={"slider green"}
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.breakMinutes}
          onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
          min={1}
          max={120}
        />
      </div>
      <div className="button-back">
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
