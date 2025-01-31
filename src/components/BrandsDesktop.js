import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Brands.css"; // Import the CSS file

const Brands = () => {
  const brandsData = {
    A: [
      "Apple",
      "Amazon",
      "Amazon Prime Video",
      "Alice + Olivia",
      "Adidas",
      "Adidas Originals",
      "Armani Exchange",
      "Ariel",
      "Asics",
      "Anastasia Beverly Hills",
      "Aldo",
      "Asus",
      "Australian Tourism",
      "Anomaly",
      "Aveda",
    ],
    B: [
      "Bobbi Brown",
      "Bottega Veneta",
      "Braun Beauty",
      "Bayern Munich FC",
      "Bacardi",
      "Benefit Cosmetics",
      "BeReal",
      "Becca Cosmetics",
      "B612",
      "Bvlgari",
      "Biolage",
      "Bumble",
      "Bath & Body Works",
    ],
    C: [
      "Coach",
      "Cannes",
      "Cadbury",
      "Canali",
      "Coke",
      "Coke Studio",
      "Charlotte Tilbury",
      "Changi Airport",
      "Crocs",
      "Collective",
      "Cosmopolitan",
      "Colgate",
      "Crunchyroll",
      "Celio",
      "Clinique",
      "Charles & Kieth",
      "Chambor",
      "Cetaphil",
      "Caudalie",
      "CA Osasuna",
      "Charmacy Milano",
    ],
    D: [
      "Delsey Paris",
      "Diesel",
      "Disney",
      "Disney +Hotstar",
      "Dune",
      "Daniel Wellington",
      "Dove",
      "Dominoes",
      "Duolingo",
      "Dyson",
      "Dolls Kill",
      "Doritos",
      "DC",
      "Dermologica",
    ],
    E: [
      "Etihad Airways",
      "E.l.f. Cosmetics",
      "Elle Carnival",
      "Estée Lauder",
      "ESPN",
      "Elizabeth Arden",
      "Eight Other Reasons",
      "Etude House",
    ],
    F: [
      "Fanta",
      "Formula 1",
      "FC Barcelona",
      "Fashion Nova",
      "Fossil",
      "Flipkart",
      "Fancode",
      "Falguni Shane Peacock",
      "French Connection",
      "Facebook",
      "Forbes",
    ],
    G: ["Garnier", "Google", "Gillete", "Garena", "Givenchy Beauty"],
    H: ["Huda Beauty", "Hyundai", "Happn", "HP", "Hershey’s", "H&M"],
    I: [
      "IMDb",
      "iQOO",
      "Indigo Airlines",
      "IIFA",
      "Ikea",
      "Inde Wild",
      "Innisfree",
      "Instagram",
    ],
    J: ["Jockey", "Jim Beam", "Jack & Jones", "Joe Malone", "Jacob & Co"],
    K: ["Kit Kat", "Kiehl’s", "Kotex", "Knorr", "KFC"],
    L: [
      "London Fashion Week",
      "L’Oréal Paris",
      "LaLiga",
      "Lancôme",
      "Lifebuoy",
      "L.G",
      "LionsGate",
      "Logitech",
      "Laneige",
      "Love Beauty & Planet",
      "LV",
    ],
    M: [
      "Milan Fashion Week",
      "Melbourne Fashion Week",
      "MAC",
      "Maybelline",
      "META",
      "Micheal Kors",
      "Marvel",
      "Marina Bay",
      "MTV",
      "Mx Player",
      "Matrix",
      "Maven Beauty",
      "Miniso",
      "Minute Maid",
      "McDonalds",
      "Masterchef Australia",
      "Makeup Forever",
      "Morphe",
      "Missguided",
      "Mario Badesco",
    ],
    N: [
      "New York Fashion Week",
      "Netflix",
      "Nestlé",
      "NBA",
      "NYX",
      "Nova men",
      "Naked Wolfe",
      "Novology",
      "Nickelodeon",
      "Nissan",
      "Neutriderm",
      "Na-kd",
      "Nivea",
      "Neutrogena",
    ],
    O: [
      "Onitsuka Tiger",
      "Oppo",
      "One Plus",
      "Olaplex",
      "OctaFX",
      "ONMO",
      "Old Spice",
      "Ordinary",
      "Olay",
    ],
    P: [
      "Paris Fashion Week",
      "Prada",
      "Pinterest",
      "Pond’s",
      "Phillips",
      "Puma",
      "Pizza Hut",
      "Pepsi",
      "Pringles",
      "Palmolive",
      "Parimatch",
      "Premier League",
      "Pebble Watch",
      "Pixi Beauty",
    ],
    Q: ["Qatar Airways"],
    R: [
      "Rare Beauty",
      "Reebok",
      "Revolve",
      "RealMe",
      "RedMI",
      "Ralph Lauren",
      "Rado",
      "Rimmel London",
      "Redbull",
      "Retrofête",
    ],
    S: [
      "Swiss Tourism",
      "Swarovski",
      "Snickers",
      "Sony Pictures",
      "Sony Music",
      "Steve Madden",
      "Superdry",
      "Sketchers",
      "Star Sports",
      "Simple Skincare",
      "Schwarzkoph",
      "Stayfree",
      "Skillshare",
      "Samsung",
      "Smashbox",
      "Snapchat",
      "Sephora",
      "Skin Story",
      "Schweppes",
      "Sol de Janeiro",
    ],
    T: [
      "Too Faced",
      "TUMI",
      "Thumbs Up",
      "Tomorrowland",
      "Techno Mobile",
      "TRESemmé",
      "Tide",
      "Toyota",
      "Triller",
      "TikTok",
      "Threads",
      "Twitter",
      "Tods",
      "Tranoï",
    ],
    U: ["Uniqlo", "Urbanic", "Uber", "Universal Music Group"],
    V: [
      "Vidcon",
      "Vivo",
      "Volvo",
      "Victoria’s Secret",
      "VisaCard",
      "Vita",
      "Vicks",
      "Venus",
      "Veet",
      "Vector & Rolf",
      "Vaseline",
      "Vouge",
      "Versace",
    ],
    W: [
      "Wink",
      "White Crow",
      "Whisper",
      "Wella",
      "Warner Music",
      "Warner Bros",
      "Wimbledon",
      "W Hotels",
    ],
    X: ["Xioami"],
    Y: ["YouTube", "Yamaha", "Yas Island", "YSL"],
    // Z: ["ZouTube", "Zamaha", "Zas Island", "ZSL"],
  };
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [isExpanded, setIsExpanded] = useState(true);
  const [popupPosition, setPopupPosition] = useState("center");
  const letterRowRefs = useRef({});

  // Divide letters into three columns
  const letters = Object.keys(brandsData);
  const columnSize = Math.ceil(letters.length / 3);

  const columns = {
    left: letters.slice(0, columnSize),
    middle: letters.slice(columnSize, columnSize * 2),
    right: letters.slice(columnSize * 2),
  };

  const calculatePosition = (letter) => {
    const rowElement = letterRowRefs.current[letter];
    if (!rowElement) return "center";

    const containerRect = rowElement
      .closest(".brands-container")
      .getBoundingClientRect();
    const rowRect = rowElement.getBoundingClientRect();
    const distanceFromTop = rowRect.top - containerRect.top;
    const distanceFromBottom = containerRect.bottom - rowRect.bottom;

    if (distanceFromTop < 200) {
      return "top";
    } else if (distanceFromBottom < 200) {
      return "bottom";
    }
    return "center";
  };

  const handleMouseEnter = (letter) => {
    if (selectedLetter === null) {
      setHoveredLetter(letter);
      setPopupPosition(calculatePosition(letter));
    }
  };

  const handleMouseLeave = () => {
    if (selectedLetter === null) {
      setHoveredLetter(null);
    }
  };

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
      setIsExpanded(false);
    } else {
      setSelectedLetter(letter);
      setIsExpanded(true);
      setPopupPosition(calculatePosition(letter));
    }
  };

  const activeLetter = selectedLetter || hoveredLetter;

  // Modify the letter row rendering to include position classes
  const renderLetterRow = (letter, columnIndex) => {
    // Add this check for the number of brands
    const brandsCount = brandsData[letter]?.length || 0;
    const useSingleColumn = brandsCount < 5; // Change the threshold to 5

    return (
      <div
        key={letter}
        className="letter-row"
        ref={(el) => (letterRowRefs.current[letter] = el)}
      >
        <div
          className={`letter-item ${activeLetter === letter ? "selected" : ""}`}
          onMouseEnter={() => handleMouseEnter(letter)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleLetterClick(letter)}
        >
          {letter}
        </div>
        {activeLetter === letter && isExpanded && (
          <div
            className={`brands-list ${
              useSingleColumn ? "single-column" : "multi-column"
            } position-${popupPosition}`}
          >
            {brandsData[letter]?.map((brand, index) => (
              <a key={index} href="#" className="brand-item">
                {brand}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add useEffect to set initial popup position for "A"
  useEffect(() => {
    // Wait for the refs to be populated
    setTimeout(() => {
      setPopupPosition(calculatePosition("A"));
    }, 0);
  }, []);

  return (
    <div class="parent-container">
      <div className="brands-container">
        <div className="letters-grid">
          {/* Left Column */}
          <div className="letter-column">
            {columns.left.map((letter) => renderLetterRow(letter, "left"))}
          </div>

          {/* Middle Column */}
          <div className="letter-column">
            {columns.middle.map((letter) => renderLetterRow(letter, "middle"))}
          </div>

          {/* Right Column */}
          <div className="letter-column">
            {columns.right.map((letter) => renderLetterRow(letter, "right"))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
