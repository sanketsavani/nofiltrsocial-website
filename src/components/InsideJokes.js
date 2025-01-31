import React, { useEffect, useState } from "react";
import "./InsideJokes.css";

const InsideJokes = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sections = [
    {
      image: "/inside-joke-1.png",
      alt: "Abstract falling figure",
      text: "vision for the ears",
      link: "https://open.spotify.com/user/31ldkcv736wv3fhxguspmj6ukib4?si=1d115f09cba14fe1",
    },
    {
      image: "/inside-joke-2.png",
      alt: "Cassette tape",
      text: "sound for the eyes",
      link: "https://in.pinterest.com/nofiltrgroup/",
    },
  ];

  useEffect(() => {
    // Ensure component is fully mounted before rendering content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (link, e) => {
    e.preventDefault();
    if (isLoaded) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isLoaded) {
    return <div className="inside-jokes-center">Loading...</div>;
  }

  return (
    <div className="inside-jokes-center">
      <div className="inside-jokes-container">
        {sections.map((section, index) => (
          <div key={index} className="section-container">
            <a
              href={section.link}
              onClick={(e) => handleClick(section.link, e)}
              className="section-link"
              style={{
                textDecoration: "none",
                color: "white",
                position: "relative",
                zIndex: 1000,
                display: "block", // Ensure the link takes full space
                WebkitTapHighlightColor: "transparent", // Remove tap highlight on iOS
              }}
            >
              <div className="frame-section">
                <div className="frame">
                  <img
                    src={section.image}
                    alt={section.alt}
                    className="frame-image"
                    onLoad={() => console.log(`Image ${index + 1} loaded`)}
                  />
                </div>
              </div>
              <div className="text-section">
                <p className="section-text">{section.text}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsideJokes;
