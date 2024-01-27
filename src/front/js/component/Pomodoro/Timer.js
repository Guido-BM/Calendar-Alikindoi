import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import React, { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { Link } from "react-router-dom";

const red = "#385170";
const green = "#ececec;";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="container-timer">
      <div>
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          styles={buildStyles({
            textColor: "#142d4c",
            pathColor: mode === "work" ? red : green,
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
      </div>
      <div className="buttons-timer">
        <div style={{ marginTop: "10px" }}>
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </div>
        <div className="settings-and-about">
          <div style={{ marginTop: "10px" }}>
            <SettingsButton
              onClick={() => settingsInfo.setShowSettings(true)}
            />
          </div>
          <div>
            <Link to="/about">
              <button className="button-about">
                <img
                  className="img-about"
                  src={require("../../assets/icons/abouthands-.png").default}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
