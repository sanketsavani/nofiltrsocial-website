import React from "react";
import "./Vision.css";

const Vision = () => {
  return (
    <div className="vision-container">
      <div className="vision-content">
        {/* <h2 className="vision-title">Vision</h2> */}
        <p className="vision-text">
          <strong>We are storytellers.</strong>
          <br />
          <br />
          Story is anything that keeps you turning the pages and doesn’t leave
          you feeling cheated at the end. Everything is driven by characters
          wanting different things and by those different things colliding.
          Every moment that one character wants something, and another character
          wants something mutually exclusive, and they collide - every time that
          happens, you have a story.
          <br />
          <br />
          Some people don’t want to be a part of someone else’s story. They
          don’t want to follow someone else’s script. They’re not fond of rules.
          You can disagree with them, but you can’t ignore them.
          <br />
          <br />
          We want to empower them. We want to enable them.
          <br />
          <br />
          <strong>We want to tell their story.</strong>
          {/* <span className="vision-highlight">We want to tell their Story.</span> */}
        </p>
      </div>
    </div>
  );
};

export default Vision;
