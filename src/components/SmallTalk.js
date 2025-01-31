import React from "react";
import "./SmallTalk.css";

const SmallTalk = () => {
  const quotes = [
    {
      text: "Working on a masterpiece. Haven’t quite finished it yet.",
      author: "Hitarth Dadia, CEO ",
    },
    {
      text: "Nofiltr isn’t just where we work; it’s where we belong, grow, and dare to make waves.",
      author: "Renita Keswani, COO",
    },

    {
      text: "“ka-ching, ka-ching” I help creators turn their passion into opportunities",
      author: "Payal Ghosh, Head of Business",
    },
    {
      text: "Keeping people happy, or not!",
      author: "Jeet Shah, CPO ",
    },
    {
      text: "Influence, innovation and a little bit of charm - just an average Tuesday at NOFILTR",
      author: "Krunal Kanabar, Head of Innovation",
    },

    {
      text: "I can make anything look better",
      author: "Anushka Sanghvi, CMO",
    },
    {
      text: "Keeping it real and profitable",
      author: "Paritosh Shah, CFO ",
    },
    {
      text: "Manager on the streets, Excel in the sheets",
      author: "Dane Pereira, Head Of Talent ",
    },
  ];

  return (
    <div className="small-talk-center">
      <div className="small-talk-container">
        <div className="intro-text">
          <p className="small-talk-para">
            Seven years ago if you had a story to tell, there weren’t a lot of
            outlets. No social media. No interest. No obvious access to an
            audience apart from your friends and your family. Fame, recognition
            and social influence were reserved to a select few. Then, social
            media happened. It made fame, a democracy. People chose their
            champions. If you had a story to tell, and the passion for creation,
            all you had to do was point, and shoot.
          </p>
        </div>
        <divc className="scroll-in-quote">
          <div className="quotes-grid">
            {quotes.map((quote, index) => (
              <div key={index} className="quote-item">
                <div className="quote-mark">
                  <svg
                    width="26"
                    height="21"
                    viewBox="0 0 31 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0816 0V11.9543C14.0816 18.9443 8.21686 24.627 4.56089 26.8726C4.09665 27.1572 3.59659 26.5654 3.9509 26.1512C4.94072 24.9956 8.88279 20.6442 9.62429 14.0816H0V0H14.0816Z"
                      fill="white"
                    />
                    <path
                      d="M30.9996 0V11.9543C30.9996 18.9443 25.1348 24.627 21.4789 26.8726C21.0146 27.1572 20.5146 26.5654 20.8689 26.1512C21.8587 24.9956 25.8008 20.6442 26.5423 14.0816H16.918V0H30.9996Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="quote-text">
                  {quote.text}
                  <br />
                  <span className="quote-author">{quote.author}</span>
                </p>
              </div>
            ))}
          </div>
        </divc>
      </div>
    </div>
  );
};

export default SmallTalk;
