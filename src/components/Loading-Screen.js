import React from "react";
import Lottie from "lottie-react";
import desktopAnimationData from "./Desktop.json"; // Import Desktop animation
import mobileAnimationData from "./Mobile.json"; // Import Mobile animation

const LoadingScreen = () => {
  // Determine if the device is mobile or portrait tablet
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024; // Adjust the dimensions as needed

  // Select animation data based on device type
  const animationData = isMobile ? mobileAnimationData : desktopAnimationData;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 9999,
      }}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ width: "100%", height: "100%" }}
        speed={0.7}  // Slowing down the animation speed
      />
    </div>
  );
};

export default LoadingScreen;
