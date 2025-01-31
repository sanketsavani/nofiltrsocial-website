import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Background.css';

const Background = () => {
  useEffect(() => {
    // Random function generator
    function random(min, max) {
      const delta = max - min;
      return (direction = 1) => (min + delta * Math.random()) * direction;
    }

    // Predefined random ranges
    const randomX = random(-400, 400);
    const randomY = random(-200, 200);
    const randomTime = random(6, 12);
    const randomTime2 = random(5, 6);
    const randomAngle = random(-30, 150);

    // Get all blur elements
    const blurs = gsap.utils.toArray(".blur");

    // Rotate function
    function rotate(target, direction) {
      gsap.to(target, {
        duration: randomTime2(),
        rotation: randomAngle(direction),
        ease: "sine.inOut",
        onComplete: () => rotate(target, direction * -1)
      });
    }

    // Move X function
    function moveX(target, direction) {
      gsap.to(target, {
        duration: randomTime(),
        x: randomX(direction),
        ease: "sine.inOut",
        onComplete: () => moveX(target, direction * -1)
      });
    }

    // Move Y function
    function moveY(target, direction) {
      gsap.to(target, {
        duration: randomTime(),
        y: randomY(direction),
        ease: "sine.inOut",
        onComplete: () => moveY(target, direction * -1)
      });
    }

    // Initialize animations for each blur element
    blurs.forEach((blur) => {
      gsap.set(blur, {
        x: randomX(-1),
        y: randomX(1),
        rotation: randomAngle(-1)
      });
      
      moveX(blur, 1);
      moveY(blur, -1);
      rotate(blur, 1);
    });
  }, []);

  return (
    <div className="background-wrapper">
      <div className="blur"></div>
      <div className="blur"></div>
      <div className="blur"></div>
    </div>
  );
};

export default Background;
