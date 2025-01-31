import React, { useState, useEffect, useRef } from "react";
import "./Roster.css";

const isMobile = () => {
  return window.innerWidth <= 768;
};

const Roster = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
const creators = [
  // {
  //   id: 1,
  //   image: "/Roster/Abhirup.webp",
  //   name: "ABHIRUP",
  // },
  {
    id: 2,
    image: "/Roster/Akruti Viras.webp",
    name: "AKRUTI VIRAS",
    instagram:
      "https://www.instagram.com/akrutiviras?igsh=MTN1eTlweTJvZGhyOQ==",
    youtube: "https://m.youtube.com/@akrutiviras",
  },
  {
    id: 3,
    image: "/Roster/Alstravge.webp",
    name: "ALSTRAVGE",
    instagram: "https://www.instagram.com/alstravage?igsh=MXcwM3Fqc3htNzFxOA==",
    youtube: "https://m.youtube.com/@ALSTRAVAGE",
  },
  // {
  //   id: 4,
  //   image: "/Roster/Anam Darbar.webp",
  //   name: "ANAM DARBAR",
  // },
  {
    id: 5,
    image: "/Roster/Ankita Chhetri.webp",
    name: "ANKITA CHHETRI",
    instagram:
      "https://www.instagram.com/ankitachhetri25?igsh=NWp2eXNxYnN4c3Bv",
    youtube: "https://m.youtube.com/@AnkitaChhetri",
  },
  {
    id: 6,
    image: "/Roster/Arshfam.webp",
    name: "ARSHFAM",
    instagram: "https://www.instagram.com/arshfam?igsh=MWl0ZHoyOGFjcm56NQ==",
    youtube: "https://m.youtube.com/@arshfam",
  },
  // {
  //   id: 7,
  //   image: "/Roster/Arshya.webp",
  //   name: "ARSHYA",
  //   instagram: "https://www.instagram.com/arshya_arora?igsh=MWR4eGtiYzRsZWIwOA==",
  //   youtube: "https://m.youtube.com/@arshya_arora",
  // },
  {
    id: 8,
    image: "/Roster/Ashi Khanna.webp",
    name: "ASHI KHANNA",
    instagram:
      "https://www.instagram.com/ashi_khanna?igsh=MTkzczZmcGt1c3BwaQ==",
    youtube: "https://m.youtube.com/@AshiKhanna",
  },
  // {
  //   id: 9,
  //   image: "/Roster/Awez Darbar.webp",
  //   name: "AWEZ DARBAR",
  // },
  {
    id: 10,
    image: "/Roster/Bhavika Sharma.webp",
    name: "BHAVIKA SHARMA",
    instagram:
      "https://www.instagram.com/bhavikasharma53?igsh=ZG0yZnhid3l4Nnp4",
    youtube: "https://m.youtube.com/@bhavikasharma9710",
  },
  {
    id: 11,
    image: "/Roster/Crystal Dsilva.webp",
    name: "CRYSTAL DSILVA",
    instagram: "https://www.instagram.com/crystalxdsilva?igsh=ZnozZXptZTBrY3Rp",
    youtube: "https://www.youtube.com/@crystalxdsilva",
  },
  {
    id: 12,
    image: "/Roster/Dharmik.webp",
    name: "DHARMIK",
    instagram:
      "https://www.instagram.com/dharmiksamani?igsh=MWhnMmx6ZDgwNmFmMQ==",
    youtube: "https://m.youtube.com/@dharmiksamani",
  },
  {
    id: 13,
    image: "/Roster/Jai Punjabi.webp",
    name: "JAI PUNJABI",
    instagram:
      "https://www.instagram.com/jaipunjabii?igsh=MWR4eGtiYzRsZWIwOA==",
    youtube: "https://www.youtube.com/@jaipunjabi",
  },
  {
    id: 14,
    image: "/Roster/Jissa Paul .webp",
    name: "JISSA PAUL",
    instagram: "https://www.instagram.com/jissapaull?igsh=aHpyODFvNDlkMWo=",
    youtube: "https://m.youtube.com/@jissapaull",
  },
  {
    id: 15,
    image: "/Roster/kanchi Sharma.webp",
    name: "KANCHI SHARMA",
    instagram: "https://www.instagram.com/kanchi.sharma?igsh=cGFicG1vc2M3N2ox",
    youtube: "https://m.youtube.com/@kanchi.sharma",
  },
  {
    id: 16,
    image: "/Roster/Manav Chhabra.webp",
    name: "MANAV CHHABRA",
    instagram: "https://www.instagram.com/mr.mnv?igsh=MW1xY2NiNndkNjNnaQ==",
    youtube: "https://m.youtube.com/@manavchhabra",
  },
  // {
  //   id: 17,
  //   image: "/Roster/Md Ali.webp",
  //   name: "MD ALI",
  // },
  {
    id: 18,
    image: "/Roster/Molly Patel .webp",
    name: "MOLLY PATEL",
    instagram: "https://www.instagram.com/mollypatel_?igsh=bzh6dXU1OWh5ZDEz",
    youtube: "https://m.youtube.com/@Mollypatel",
  },
  {
    id: 19,
    image: "/Roster/Mrinmoyee.webp",
    name: "MRINMOYEE",
    instagram:
      "https://www.instagram.com/mrinmoyeeghose?igsh=MTdsNnkyMnloYjJsbw==",
    youtube: "https://m.youtube.com/@mrinmoyeeghose",
  },
  // {
  //   id: 21,
  //   image: "/Roster/Nagma Mirajkar.webp",
  //   name: "NAGMA MIRAJKAR",
  // },
  // {
  //   id: 22,
  //   image: "/Roster/Naveen Sharma.webp",
  //   name: "NAVEEN SHARMA",
  // },
  {
    id: 23,
    image: "/Roster/Pooja Dhatrak.webp",
    name: "POOJA DHATRAK",
    instagram: "https://www.instagram.com/muchintoomuch?igsh=eDRmd2U1cDQxeWdr",
    youtube: "https://m.youtube.com/@PoojaaDhatrak",
  },
  {
    id: 24,
    image: "/Roster/Prachi Hotchandani.webp",
    name: "PRACHI HOTCHANDANI",
    instagram:
      "https://www.instagram.com/thatswirlingsoul?igsh=MW4waTAwYnB5eG85Mw==",
    youtube: "https://m.youtube.com/@prachihotchandani",
  },
  {
    id: 25,
    image: "/Roster/Rishabh Chawla.webp",
    name: "RISHABH CHAWLA",
    instagram:
      "https://www.instagram.com/rishabhchawlaaa?igsh=Nnh5OWN3cDZpcGc0",
    youtube: "https://m.youtube.com/@rishabhchawla233",
  },
  {
    id: 26,
    image: "/Roster/Sahil Mehta.webp",
    name: "SAHIL MEHTA",
    instagram:
      "https://www.instagram.com/sahilmehtaa_?igsh=MTl0bHJnaWd0eGV0eQ==",
    youtube: "https://m.youtube.com/@sahilmehtaa",
  },
  {
    id: 27,
    image: "/Roster/Sana Rakheja .webp",
    name: "SANA RAKHEJA",
    instagram: "https://www.instagram.com/sanaarakheja?igsh=ODcwYzFoMHVkc3Js",
    youtube: "https://m.youtube.com/@sanaarakheja",
  },
  {
    id: 28,
    image: "/Roster/Sanju.webp",
    name: "SANJU",
    instagram: "https://www.instagram.com/sanjushreshtha/",
    youtube: "https://www.youtube.com/@sanjushreshthavlogs",
  },
  {
    id: 29,
    image: "/Roster/Sanket Mehta.webp",
    name: "SANKET MEHTA",
    instagram: "https://www.instagram.com/sankett25?igsh=eDIxcDRlNWhtNHJ3",
    youtube: "https://m.youtube.com/@sankett25",
  },
  {
    id: 30,
    image: "/Roster/Santosh Mishra.webp",
    name: "SANTOSH MISHRA",
    instagram:
      "https://www.instagram.com/aye_santosh?igsh=MWhzYzY1aW9ydnM2ZQ==",
    youtube: "https://www.youtube.com/@AyeSantosh",
  },
  {
    id: 31,
    image: "/Roster/Shruti .webp",
    name: "SHRUTI",
    instagram:
      "https://www.instagram.com/thatswirlingsoul?igsh=MW4waTAwYnB5eG85Mw==",
    youtube: "https://m.youtube.com/@thatswirlingsoul",
  },
  {
    id: 32,
    image: "/Roster/Sunny Chopra.webp",
    name: "SUNNY CHOPRA",
    instagram: "https://www.instagram.com/ssunnychoppra?igsh=dWR1ajg4YTdvM3p3",
    youtube: "https://m.youtube.com/@SunnyChopra",
  },
  {
    id: 33,
    image: "/Roster/Sushmita Rathod.webp",
    name: "SUSHMITA RATHOD",
    instagram:
      "https://www.instagram.com/sushmita.xr?igsh=MTk0MHIybmt6MmV5OA==",
    youtube: "https://m.youtube.com/@sushmitarathod19",
  },
  {
    id: 34,
    image: "/Roster/Tanzeel Khan.webp",
    name: "TANZEEL KHAN",
    instagram:
      "https://www.instagram.com/tanzeel_khan03?igsh=MW4yMnFyZzE5bHB5bg==",
    youtube: "https://m.youtube.com/channel/UChYHlC5c-eLi2GzrSXCOwFA",
  },
  {
    id: 35,
    image: "/Roster/Themermaidscales.webp",
    name: "THEMERMAIDSCALES",
    instagram:
      "https://www.instagram.com/themermaidscales?igsh=Y3ZiMHpqMmhldjAw",
    youtube: "https://m.youtube.com/@themermaidscales3585",
  },
  {
    id: 36,
    image: "/Roster/Ugxy.webp",
    name: "UGXY",
    instagram:
      "https://www.instagram.com/ugxygoddess?igsh=MTE1bmUyYjB0amg2MA==",
    youtube: "https://m.youtube.com/@ugxyYT",
  },
  {
    id: 37,
    image: "/Roster/Unnati Malharkar.webp",
    name: "UNNATI MALHARKAR",
    instagram: "https://www.instagram.com/unnati_m?igsh=MTBzejA0Y3hsb3pndg==",
    youtube: "https://m.youtube.com/@unnatimalharkar",
  },
  {
    id: 38,
    image: "/Roster/Zaid Darbar.webp",
    name: "ZAID DARBAR",
    instagram:
      "https://www.instagram.com/zaid_darbar?igsh=MWcyOXVsemtiaG43eA==",
    youtube: "https://m.youtube.com/@zaidfdarbar",
  },
  {
    id: 39,
    image: "/Roster/Samyak Herode.webp",
    name: "SAMYAK HERODE",
    instagram:"https://www.instagram.com/ssamyakkk__",
    // youtube: "https://m.youtube.com/@zaidfdarbar",
  },
  // {
  //   id: 39,
  //   image: "/Roster/Shreya Kalra.png",
  //   name: "SHREYA KALRA",
  //   instagram: "https://www.instagram.com/theshreyakalra/",
  //   youtube: "https://www.youtube.com/@theshreyakalra",
  // },
];

  const handleSlideChange = (direction) => {
    setCurrentSlide((prev) => {
      let newSlide = prev + direction;

      if (newSlide >= creators.length) {
        newSlide = 0;
      } else if (newSlide < 0) {
        newSlide = creators.length - 1;
      }

      return newSlide;
    });
  };

  // Enhanced wheel handler for horizontal scrolling
  const handleWheel = (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    const timeSinceLastScroll = currentTime - lastScrollTime.current;

    if (timeSinceLastScroll < 200) {
      return;
    }

    // Handle both vertical and horizontal scroll
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    scrollAccumulator.current += Math.abs(delta) > 50 ? delta / 3 : delta / 4;

    const scrollThreshold = 150;

    if (Math.abs(scrollAccumulator.current) > scrollThreshold) {
      const direction = scrollAccumulator.current > 0 ? 1 : -1;
      handleSlideChange(direction);
      scrollAccumulator.current = 0;
      lastScrollTime.current = currentTime;
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handleSlideChange(-1);
    } else if (e.key === "ArrowRight") {
      handleSlideChange(1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance for swipe

    if (Math.abs(diffX) > threshold) {
      handleSlideChange(diffX > 0 ? 1 : -1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const element = document.querySelector(".roster-track");
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isMobile() || isHovered || isDragging) return;

    const timer = setInterval(() => {
      handleSlideChange(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, isDragging]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === "mousedown" ? e.pageX : e.touches[0].pageX);
    setScrollLeft(currentSlide);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    const walk = (startX - x) / 300;

    if (Math.abs(walk) > 0.3) {
      let newSlide = Math.round(scrollLeft + walk);

      if (newSlide >= creators.length) {
        newSlide = 0;
      } else if (newSlide < 0) {
        newSlide = creators.length - 1;
      }

      setCurrentSlide(newSlide);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    scrollAccumulator.current = 0;
  };

  return (
    <div className="roster-center">
      <div className="roster-container">
        <div className="roster-wrapper">
          <div
            className={`roster-slider ${isHovered ? "is-hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="roster-track"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => {
                handleDragStart(e);
                handleTouchStart(e);
              }}
              onTouchMove={(e) => {
                handleDragMove(e);
                handleTouchMove(e);
              }}
              onTouchEnd={(e) => {
                handleDragEnd();
                handleTouchEnd();
              }}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {creators.map((creator, index) => {
                let position = index - currentSlide;
                if (position < -8) position += creators.length;
                if (position > 8) position -= creators.length;

                return (
                  <div
                    key={creator.id}
                    className={`roster-item ${position === 0 ? "active" : ""}`}
                    style={{
                      "--position": position,
                      opacity: Math.abs(position) <= 3 ? 1 : 0,
                    }}
                    onClick={() => window.open(creator.instagram, "_blank")}
                  >
                    <div className="roster-item-inner">
                      <div className="roster-image-container">
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="roster-image"
                        />
                        <div className="roster-overlay">
                          <h3 className="roster-creator-name">
                            {creator.name}
                          </h3>
                          {/* <a href={creator.youtube} target="_blank" rel="noopener noreferrer">YouTube</a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="roster-nav prev"
              onClick={() => handleSlideChange(-1)}
            >
              ‹
            </button>
            <button
              className="roster-nav next"
              onClick={() => handleSlideChange(1)}
            >
              ›
            </button>

            <div className="roster-dots">
              {creators.map((_, index) => (
                <button
                  key={index}
                  className={`roster-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
