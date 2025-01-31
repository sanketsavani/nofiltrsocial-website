// import { useState, useEffect } from 'react';

// const CustomCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isMoving, setIsMoving] = useState(false);
//   let timeoutId = null;

//   useEffect(() => {
//     const updatePosition = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//       setIsMoving(true);
      
//       // Clear any existing timeout
//       if (timeoutId) clearTimeout(timeoutId);
      
//       // Set a new timeout to mark cursor as not moving
//       timeoutId = setTimeout(() => {
//         setIsMoving(false);
//       }, 20000);
//     };

//     document.addEventListener('mousemove', updatePosition);
    
//     return () => {
//       document.removeEventListener('mousemove', updatePosition);
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, []);

//   const cursorElement = document.createElement('div');
//   cursorElement.style.position = 'fixed';
//   cursorElement.style.left = `${position.x - 16}px`;
//   cursorElement.style.top = `${position.y - 16}px`;
//   cursorElement.style.width = '32px';
//   cursorElement.style.height = '32px';
//   cursorElement.style.pointerEvents = 'none';
//   cursorElement.style.zIndex = '9999';
//   cursorElement.style.transition = 'transform 0.1s ease';

//   const imgElement = document.createElement('img');
//   // imgElement.src = './cursor.svg';
//   imgElement.alt = '';
//   imgElement.className = `custom-cursor ${!isMoving ? 'rotating' : ''}`;
//   imgElement.style.width = '100%';
//   imgElement.style.height = '100%';

//   cursorElement.appendChild(imgElement);
  
//   return cursorElement;
// };

// export default CustomCursor; 