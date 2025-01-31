import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Brands.css";

const BrandsMobile = ({ brandsData }) => {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const lettersContainerRef = useRef(null);
  const brandsContainerRef = useRef(null);
  const letterRowRefs = useRef({});
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const letters = Object.keys(brandsData);

  // Improved letter scroll handler with debouncing
  const handleLetterScroll = useCallback(
    (e) => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const container = lettersContainerRef.current;
        if (!container) return;

        const letterElements = container.querySelectorAll(".letter-item");
        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        let closestLetter = null;
        let minDistance = Infinity;

        letterElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            closestLetter = element.textContent;
          }
        });

        if (closestLetter && closestLetter !== selectedLetter) {
          setSelectedLetter(closestLetter);
        }
      }, 1000); // Increased debounce delay for better performance on mobile
    },
    [selectedLetter]
  );

  // Improved brands scroll handler with element height measurement
  const handleBrandsScroll = useCallback(
    (e) => {
      if (isUserScrolling) return;

      const container = brandsContainerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Find visible section using actual element positions
      const sections = container.querySelectorAll(".letter-brands-group");
      let currentLetter = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + rect.height;

        if (
          scrollPosition >= sectionTop - 50 &&
          scrollPosition < sectionBottom
        ) {
          currentLetter = section.getAttribute("data-letter");
        }
      });

      if (currentLetter && currentLetter !== selectedLetter) {
        setSelectedLetter(currentLetter);
        const letterElement = letterRowRefs.current[currentLetter];
        if (letterElement) {
          letterElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    },
    [selectedLetter, isUserScrolling]
  );

  useEffect(() => {
    const lettersContainer = lettersContainerRef.current;
    const brandsContainer = brandsContainerRef.current;

    lettersContainer?.addEventListener("scroll", handleLetterScroll);
    brandsContainer?.addEventListener("scroll", handleBrandsScroll);

    // Center the initial selected letter
    if (lettersContainer && letterRowRefs.current[selectedLetter]) {
      letterRowRefs.current[selectedLetter].scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }

    return () => {
      lettersContainer?.removeEventListener("scroll", handleLetterScroll);
      brandsContainer?.removeEventListener("scroll", handleBrandsScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleLetterScroll, handleBrandsScroll]);

  const handleLetterClick = (letter) => {
    // Prevent redundant clicks
    if (letter === selectedLetter) return;
    
    setIsUserScrolling(true);
    setSelectedLetter(letter);

    const section = brandsContainerRef.current?.querySelector(
      `[data-letter="${letter}"]`
    );

    if (section) {
      // Calculate the scroll position instead of using scrollIntoView
      const container = brandsContainerRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const sectionTop = section.getBoundingClientRect().top;
      const scrollOffset = sectionTop - containerTop;
      
      // Manually scroll to position
      container.scrollTo({
        top: container.scrollTop + scrollOffset,
        behavior: 'auto'
      });
    }

    // Reset the user scrolling flag after a short delay
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 300); // Even shorter timeout for better responsiveness
  };

  return (
    <div className="brands-container mobile">
      <div className="letters-grid">
        <div
          className="letter-column"
          ref={lettersContainerRef}
          style={{ touchAction: "pan-y" }}
        >
          {letters.map((letter) => (
            <div
              key={letter}
              className="letter-row"
              ref={(el) => (letterRowRefs.current[letter] = el)}
              onClick={() => handleLetterClick(letter)}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`letter-item ${
                  selectedLetter === letter ? "selected" : ""
                }`}
              >
                {letter}
              </div>
            </div>
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`invisible-${index}`} className="invisible-letter-row" />
          ))}
        </div>
        <div className="brands-list" ref={brandsContainerRef}>
          {letters.map((letter) => (
            <div
              key={letter}
              className={`letter-brands-group ${
                selectedLetter === letter ? "selected" : ""
              }`}
              data-letter={letter}
            >
              {brandsData[letter].map((brand, index) => (
                <a
                  key={index}
                  href="#"
                  className="brand-item"
                  onClick={(e) => e.preventDefault()}
                >
                  {brand}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsMobile;
