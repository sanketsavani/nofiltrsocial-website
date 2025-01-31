import React, { useState, useEffect } from "react";
import "./App.css";
import LoadingScreen from "./components/Loading-Screen";
// import Logo from "./logo-nofiltr.svg";
import Logo from "./logo-nofiltr-white.svg";

import SmallTalk from "./components/SmallTalk";
import Vision from "./components/Vision";
import Brands from "./components/Brands";
import Roster from "./components/Roster";
import Expertise from "./components/Expertise";
import InsideJokes from "./components/InsideJokes";
import SpeedDial from "./components/SpeedDial";
import Archives from "./components/Archives";
import Background from "./components/Background";
// import CustomCursor from "./components/CustomCursor";
import ArrowIcon from "./arrow-top-right-svgrepo-com.png";
import CursorCustom from "./cursor.svg";


const tabs = [
  { label: "SMALL TALK,", component: <SmallTalk /> },
  { label: "VISION,", component: <Vision /> },
  { label: "BRANDS,", component: <Brands /> },
  { label: "ROSTER,", component: <Roster /> },
  { label: "EXPERTISE,", component: <Expertise /> },
  { label: "INSIDE-JOKES,", component: <InsideJokes /> },
  { label: "SPEED-DIAL,", component: <SpeedDial /> },
  {
    label: (
      <span className="archives-label">
        ARCHIVES
        <img src={ArrowIcon} alt="arrow" className="arrow-icon" />
      </span>
    ),
    component: <Archives />,
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [clickedTab, setClickedTab] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  let timeoutId = null;

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsMoving(false);
      }, 2000);
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Set a timeout to match your animation duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // Increased to 6 seconds to see the full animation

    return () => clearTimeout(timer);
  }, []);





  const handleTabClick = (tabLabel) => {
    if (clickedTab === tabLabel) {
      setClickedTab(null); // Toggle close if already clicked
    } else {
      setClickedTab(tabLabel);
      setActiveTab(null); // Reset active hover state on click
    }
  };

  const handleMouseEnter = (tabLabel) => {
    if (!clickedTab) {
      // Only apply hover when no tab is clicked
      setActiveTab(tabLabel);
    }
  };

  const handleMouseLeave = () => {
    if (!clickedTab) {
      // Only clear hover state when no tab is clicked
      setActiveTab(null);
    }
  };

  const displayContent = clickedTab || activeTab; // Prioritize clicked tab over hover

  const handleBrandNameClick = () => {
    setClickedTab(null); // Reset clicked tab
    setActiveTab(null); // Reset active tab
  };

  return (
    <div className="root-container">
      <div
        className="hide-cursor-border"
        style={{
          position: "fixed",
          left: position.x - 16,
          top: position.y - 16,
          width: "16px",
          height: "16px",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.1s ease",
          // border: "2px solid black",
          borderRadius: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={CursorCustom}
          alt=""
          className={`custom-cursor ${!isMoving ? "rotating" : ""}`}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Background />
          <div
            className={`app-container ${
              displayContent ? "blur-background" : ""
            }`}
          >
            {/* Add Logo for mobile */}
            <div
              className="mobile-logo-container"
              onClick={handleBrandNameClick}
            >
              <img
                src={Logo}
                alt="NoFiltr Logo"
                className={`mobile-logo ${displayContent ? "active" : ""}`}
              />
            </div>

            {/* Top Headings */}
            <div className="tabs-container">
              <div className="top-line">
                {tabs.slice(0, 5).map((tab) => (
                  <div
                    key={tab.label}
                    className={`tab-item ${
                      displayContent === tab.label ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.label)}
                    onMouseEnter={() => handleMouseEnter(tab.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              <div className="bottom-line">
                {tabs.slice(5).map((tab) => (
                  <div
                    key={tab.label}
                    className={`tab-item ${
                      displayContent === tab.label ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.label)}
                    onMouseEnter={() => handleMouseEnter(tab.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle content */}
            {/* <div className="content-container">
              {displayContent && (
                <div className="tab-content">
                  {tabs.find((tab) => tab.label === displayContent)?.component}
                </div>
              )}
            </div> */}
            
<div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
  {displayContent === "INSIDE-JOKES," ? (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <InsideJokes />
    </div>
  ) : (
    <div className="tab-content">
      {tabs.find((tab) => tab.label === displayContent)?.component}
    </div>
  )}
</div>
              

            {/* Bottom Brand Name */}
            <div className="brand-name" onClick={handleBrandNameClick}>
              NOFILTR SOCIAL
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
