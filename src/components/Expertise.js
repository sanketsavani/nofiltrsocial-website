import React from "react";
import "./Expertise.css";
import VennDiagram from "./Expertise-Venn-Diagram.png";
import CreatorCircle from "./Expertise-Creator-Circle.svg";

const Expertise = () => {
  React.useEffect(() => {
    const content = document.querySelector(".expertise-content");
    if (!content) return;

    let isScrolling = true;
    let scrollInterval;
    let currentSection = 0;
    let isForward = true;
    const sections = document.querySelectorAll(".expertise-content > div");
    const totalSections = sections.length;
    const scrollDelay = 5000; // Time between scrolls (5 seconds)
    const scrollDuration = 1000; // Smooth scroll duration (1 second)

    const scrollToSection = (index) => {
      // Clear any existing scrolling animation
      if ('scrollBehavior' in document.documentElement.style) {
        content.style.scrollBehavior = 'smooth';
      }

      if (window.innerWidth < 1024) {
        // Mobile scrolling
        const width = content.clientWidth;
        content.scrollTo({
          left: width * index,
          behavior: 'smooth'
        });
      } else {
        // Desktop scrolling
        const targetSection = sections[index];
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    };

    const startAutoScroll = () => {
      if (!isScrolling) return;
      
      // Clear any existing interval
      clearInterval(scrollInterval);

      scrollInterval = setInterval(() => {
        if (isScrolling) {
          if (isForward) {
            currentSection++;
            if (currentSection >= totalSections - 1) {
              isForward = false;
            }
          } else {
            currentSection--;
            if (currentSection <= 0) {
              isForward = true;
            }
          }
          scrollToSection(currentSection);
        }
      }, scrollDelay);
    };

    const handleInteractionStart = (e) => {
      isScrolling = false;
      clearInterval(scrollInterval);
    };

    const handleInteractionEnd = (e) => {
      // Prevent immediate restart of scrolling
      clearTimeout(window.scrollTimeout);
      
      window.scrollTimeout = setTimeout(() => {
        isScrolling = true;
        
        // Calculate current section based on scroll position
        if (window.innerWidth < 1024) {
          const scrollPosition = content.scrollLeft;
          const sectionWidth = content.clientWidth;
          currentSection = Math.round(scrollPosition / sectionWidth);
        } else {
          // For desktop, find the most visible section
          let maxVisibility = 0;
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const visibility = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              currentSection = index;
            }
          });
        }
        
        // Determine scroll direction based on current section
        isForward = currentSection < Math.floor(totalSections / 2);
        
        startAutoScroll();
      }, scrollDelay);
    };

    // Add event listeners based on device type
    if (window.innerWidth < 1024) {
      content.addEventListener("touchstart", handleInteractionStart, { passive: true });
      content.addEventListener("touchend", handleInteractionEnd, { passive: true });
    } else {
      content.addEventListener("mouseenter", handleInteractionStart);
      content.addEventListener("mouseleave", handleInteractionEnd);
    }

    // Initial setup
    scrollToSection(0);
    startAutoScroll();

    // Cleanup
    return () => {
      clearInterval(scrollInterval);
      clearTimeout(window.scrollTimeout);
      content.removeEventListener("touchstart", handleInteractionStart);
      content.removeEventListener("touchend", handleInteractionEnd);
      content.removeEventListener("mouseenter", handleInteractionStart);
      content.removeEventListener("mouseleave", handleInteractionEnd);
    };
  }, []);

  React.useEffect(() => {
    const sections = document.querySelectorAll(".expertise-content > div");

    const handleScroll = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          section.classList.add("bounce-active");
        } else {
          section.classList.remove("bounce-active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const wrapper = document.querySelector('.expertise-wrapper');
    const content = document.querySelector('.expertise-content');
    
    const updateScrollProgress = () => {
        const scrolled = content.scrollLeft;
        const maxScroll = content.scrollWidth - content.clientWidth;
        const percentage = (scrolled / maxScroll) * (100 - 33.33);
        wrapper.style.setProperty('--scroll-progress', `${percentage}%`);
    };

    content.addEventListener('scroll', updateScrollProgress);
    return () => content.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="expertise-center">
      <div className="expertise-wrapper">
        <div className="expertise-content">
          {/* section 1 */}
          <div className="expertise-intro ">
            <p className="expertise-intro-text">
              We believe in first identifying our niche, monopolizing that, and
              then targeting the immediate next vertical. If we can make anyone
              into a good creator, we are not participating in the rat race of
              management.
            </p>
            <p className="expertise-quote">
              "WE CAN MAKE ANYONE INTO A GOOD CREATOR"
            </p>
          </div>
          {/* section 2 */}
          <div className="sections-gap">
            <img
              src={CreatorCircle}
              alt="Expertise Creator Circle"
              className="creator-circle"
            />
          </div>
          {/* section 3 */}
          <div className="expertise-summary sections-gap-2">
            <p className="expertise-summary-text">While we have these teams,</p>
            <p className="expertise-summary-highlight">
              We monopolize in Personal Branding.
            </p>
            <div className="venn-diagram">
              <img
                src={VennDiagram}
                alt="Expertise Venn Diagram"
                className="venn-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
