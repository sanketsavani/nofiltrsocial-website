import React, { useState, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css"; // Import Masonry
import "./Archives.css";
import styled from "styled-components";

const BackgroundSection = styled.div`
  height: 100vh;
  padding: 5vw;
  background: radial-gradient(circle, #696bff, #94c2ff, #cfe4ff);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const BlurElement = styled.div`
  position: absolute;
  border-radius: 900px;
  filter: blur(clamp(40px, 5vw, 90px));
  background: radial-gradient(circle, #000618, #000a2b, #000295, #1a1cd1);
  animation: float 10s infinite ease-in-out alternate;

  &:nth-child(1) {
    height: clamp(480px, 48vw, 48vw);
    width: calc(clamp(480px, 48vw, 48vw) * 1.1);
    top: 10%;
    left: 15%;
  }

  &:nth-child(2) {
    height: clamp(360px, 48vw, 48vw);
    width: calc(clamp(360px, 48vw, 48vw) * 1.1);
    bottom: 10%;
    right: 15%;
  }

  &:nth-child(3) {
    height: clamp(120px, 12vw, 12vw);
    width: calc(clamp(120px, 12vw, 12vw) * 1.1);
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(20px, 20px);
    }
  }
`;

const Archives = () => {
  const [dimensions, setDimensions] = useState({});

  // Function to get media dimensions
  const getMediaDimensions = (src, type) => {
    return new Promise((resolve) => {
      if (type === "image") {
        const img = new Image();
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        img.src = src;
      } else if (type === "video") {
        const video = document.createElement("video");
        video.onloadedmetadata = () => {
          resolve({
            width: video.videoWidth,
            height: video.videoHeight,
          });
        };
        video.src = src;
      }
    });
  };

  // Function to estimate item height based on dimensions and type
  const getEstimatedHeight = (item) => {
    const dims = dimensions[item.src];
    if (!dims) return 300; // default height if dimensions not loaded
    const aspectRatio = dims.width / dims.height;
    // Assuming a standard column width of 300px
    return 300 / aspectRatio;
  };

const archiveItems = [
  // Row 1
  { type: "image", src: "Archives/111.webp" },
  { type: "image", src: "Archives/70.webp" },
  { type: "image", src: "Archives/1.webp" },
  { type: "image", src: "Archives/37.webp" },
  { type: "image", src: "Archives/42.webp" },

  // Row 2
  { type: "image", src: "Archives/26.webp" },
  { type: "image", src: "Archives/102.webp" },
  { type: "image", src: "Archives/112.webp" },
  { type: "image", src: "Archives/67.webp" },
  { type: "image", src: "Archives/83.webp" },

  // Row 3
  { type: "image", src: "Archives/20.webp" },
  { type: "image", src: "Archives/5.webp" },
  { type: "image", src: "Archives/74.webp" },
  { type: "image", src: "Archives/55.webp" },
  { type: "image", src: "Archives/75.webp" },

  // Row 4
  { type: "image", src: "Archives/94.webp" },
  { type: "image", src: "Archives/89.webp" },
  { type: "image", src: "Archives/100.webp" },
  { type: "image", src: "Archives/103.webp" },
  { type: "image", src: "Archives/88.webp" },

  // Row 5
  { type: "image", src: "Archives/78.webp" },
  { type: "image", src: "Archives/85.webp" },
  { type: "image", src: "Archives/81.webp" },
  { type: "image", src: "Archives/17.webp" },
  { type: "image", src: "Archives/73.webp" },

  // Row 6
  { type: "image", src: "Archives/29.webp" },
  { type: "image", src: "Archives/22.webp" },
  { type: "image", src: "Archives/57.webp" },
  { type: "image", src: "Archives/52.webp" },
  { type: "image", src: "Archives/27.webp" },

  // Row 7
  { type: "image", src: "Archives/68.webp" },
  { type: "image", src: "Archives/60.webp" },
  { type: "image", src: "Archives/87.webp" },
  { type: "image", src: "Archives/86.webp" },
  { type: "image", src: "Archives/58.webp" },

  // Row 8
  { type: "image", src: "Archives/98.webp" },
  { type: "image", src: "Archives/97.webp" },
  { type: "image", src: "Archives/38.webp" },
  { type: "image", src: "Archives/101.webp" },
  { type: "image", src: "Archives/90.webp" },

  // Row 9
  { type: "image", src: "Archives/11.webp" },
  { type: "image", src: "Archives/9.webp" },
  { type: "image", src: "Archives/14.webp" },
  { type: "image", src: "Archives/13.webp" },
  { type: "image", src: "Archives/72.webp" },

  // Row 10
  { type: "image", src: "Archives/39.webp" },
  { type: "image", src: "Archives/30.webp" },
  { type: "image", src: "Archives/41.webp" },
  { type: "image", src: "Archives/40.webp" },
  { type: "image", src: "Archives/36.webp" },

  // Row 11
  { type: "image", src: "Archives/66.webp" },
  { type: "image", src: "Archives/54.webp" },
  { type: "image", src: "Archives/84.webp" },
  { type: "image", src: "Archives/71.webp" },
  { type: "image", src: "Archives/56.webp" },

  // Row 12
  { type: "image", src: "Archives/95.webp" },
  { type: "image", src: "Archives/92.webp" },
  { type: "image", src: "Archives/106.webp" },
  { type: "image", src: "Archives/104.webp" },
  { type: "image", src: "Archives/93.webp" },

  // Row 13
  { type: "image", src: "Archives/113.webp" },
  { type: "image", src: "Archives/108.webp" },
  { type: "image", src: "Archives/116.webp" },
  { type: "image", src: "Archives/89.webp" },
  { type: "image", src: "Archives/110.webp" },

  // Row 14
  { type: "image", src: "Archives/51.webp" },
  { type: "image", src: "Archives/6.webp" },
  { type: "image", src: "Archives/65.webp" },
  { type: "image", src: "Archives/79.webp" },
  { type: "image", src: "Archives/10.webp" },

  // Row 15
  { type: "image", src: "Archives/63.webp" },
  { type: "image", src: "Archives/76.webp" },
  { type: "image", src: "Archives/50.webp" },
  { type: "image", src: "Archives/62.webp" },
  { type: "image", src: "Archives/3.webp" },

  // Row 16
  { type: "image", src: "Archives/59.webp" },
  { type: "image", src: "Archives/2.webp" },
  { type: "image", src: "Archives/48.webp" },
  { type: "image", src: "Archives/80.webp" },
  { type: "image", src: "Archives/114.webp" },

  // Row 17
  { type: "image", src: "Archives/91.webp" },
  { type: "image", src: "Archives/105.webp" },
  { type: "image", src: "Archives/47.webp" },
  { type: "image", src: "Archives/96.webp" },
  { type: "image", src: "Archives/99.webp" },

  // Row 18
  { type: "image", src: "Archives/82.webp" },
  { type: "image", src: "Archives/23.webp" },
  { type: "image", src: "Archives/107.webp" },
  { type: "image", src: "Archives/43.webp" },
  { type: "image", src: "Archives/19.webp" },

  // Row 19
  { type: "image", src: "Archives/69.webp" },
  { type: "video", src: "Archives/4.mp4" },
  { type: "video", src: "Archives/7.mp4" },
  { type: "image", src: "Archives/109.webp" },
  { type: "image", src: "Archives/64.webp" },

  // Row 20
  { type: "video", src: "Archives/12.mp4" },
  { type: "video", src: "Archives/18.mp4" },
  { type: "video", src: "Archives/21.mp4" },
  { type: "video", src: "Archives/16.mp4" },
  { type: "video", src: "Archives/8.mp4" },

  // Row 21
  { type: "video", src: "Archives/25.mp4" },
  { type: "video", src: "Archives/31.mp4" },
  { type: "video", src: "Archives/32.mp4" },
  { type: "video", src: "Archives/28.mp4" },
  { type: "video", src: "Archives/24.mp4" },

  // Row 22
  { type: "video", src: "Archives/34.mp4" },
  { type: "video", src: "Archives/44.mp4" },
  { type: "video", src: "Archives/45.mp4" },
  { type: "video", src: "Archives/35.mp4" },
  { type: "video", src: "Archives/33.mp4" },

  // Row 23
  { type: "video", src: "Archives/49.mp4" },
  { type: "video", src: "Archives/77.MP4" },
  { type: "video", src: "Archives/61.MP4" },
  { type: "video", src: "Archives/53.mp4" },
  { type: "video", src: "Archives/46.mp4" },
];

 const renderArchiveItem = (item, index) => {
   const itemDimensions = dimensions[item.src];

   return (
     <div
       className={`archive-item ${
         item.type === "video" ? "video-item" : "image-item"
       }`}
       key={index}
     >
       {item.type === "video" ? (
         <video
           loop
           muted
           playsInline
           className="archive-media video-media"
           style={
             itemDimensions
               ? {
                   width: "100%",
                   height: "auto",
                   aspectRatio: `${itemDimensions.width}/${itemDimensions.height}`,
                 }
               : null
           }
           onMouseOver={(e) => e.target.play()}
           onMouseOut={(e) => {
             e.target.pause();
             e.target.currentTime = 0;
           }}
         >
           <source src={item.src} type="video/mp4" />
         </video>
       ) : (
         <img
           src={item.src}
           alt=""
           loading="lazy"
           className="archive-media image-media"
           style={
             itemDimensions
               ? {
                   width: "100%",
                   height: "auto",
                   aspectRatio: `${itemDimensions.width}/${itemDimensions.height}`,
                 }
               : null
           }
         />
       )}
     </div>
   );
 };

 useEffect(() => {
   // Load and store dimensions for all media
   const loadDimensions = async () => {
     const dimensionsMap = {};
     for (const item of archiveItems) {
       try {
         const dims = await getMediaDimensions(item.src, item.type);
         dimensionsMap[item.src] = dims;
       } catch (error) {
         console.error(`Error loading dimensions for ${item.src}:`, error);
       }
     }
     setDimensions(dimensionsMap);
   };

   loadDimensions();
 }, []);

 // Function to distribute items by estimated height
//  const distributeItems = (items, columnCount) => {
//    // Create array to track column heights
//    const columns = Array.from({ length: columnCount }, () => ({
//      items: [],
//      height: 0
//    }));

//    // Separate items by type and sort each by height
//    const images = items.filter(item => item.type === 'image')
//      .sort((a, b) => getEstimatedHeight(b) - getEstimatedHeight(a));
//    const videos = items.filter(item => item.type === 'video')
//      .sort((a, b) => getEstimatedHeight(b) - getEstimatedHeight(a));

//    // Interleave images and videos while maintaining height balance
//    const mixedItems = [];
//    const videoRatio = videos.length / items.length;
//    let imageIndex = 0;
//    let videoIndex = 0;

//    while (imageIndex < images.length || videoIndex < videos.length) {
//      // Decide whether to add video or image based on ratio and random factor
//      const shouldAddVideo = 
//        videoIndex < videos.length && 
//        (imageIndex >= images.length || 
//         (Math.random() < videoRatio && videoIndex/videos.length <= imageIndex/images.length));

//      if (shouldAddVideo) {
//        mixedItems.push(videos[videoIndex]);
//        videoIndex++;
//      } else if (imageIndex < images.length) {
//        mixedItems.push(images[imageIndex]);
//        imageIndex++;
//      }
//    }

//    // Place mixed items in columns by height
//    for (const item of mixedItems) {
//      // Find the column with the smallest height
//      const shortestColumn = columns.reduce((min, col, index) => 
//        col.height < columns[min].height ? index : min
//      , 0);

//      const itemHeight = getEstimatedHeight(item);
//      columns[shortestColumn].items.push(item);
//      columns[shortestColumn].height += itemHeight;
//    }

//    // Combine all items in order from left to right, top to bottom
//    const maxItems = Math.ceil(items.length / columnCount);
//    const distributedItems = [];
   
//    for (let i = 0; i < maxItems; i++) {
//      for (let j = 0; j < columnCount; j++) {
//        if (columns[j].items[i]) {
//          distributedItems.push(columns[j].items[i]);
//        }
//      }
//    }

//    return distributedItems;
//  };
const distributeItems = (items, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => ({
    items: [],
    height: 0,
  }));

  const images = items
    .filter((item) => item.type === "image")
    .sort((a, b) => getEstimatedHeight(b) - getEstimatedHeight(a));
  const videos = items
    .filter((item) => item.type === "video")
    .sort((a, b) => getEstimatedHeight(b) - getEstimatedHeight(a));

  const mixedItems = [];
  let imageIndex = 0;
  let videoIndex = 0;

  while (imageIndex < images.length || videoIndex < videos.length) {
    const shouldAddVideo =
      videoIndex < videos.length && imageIndex >= images.length;

    if (shouldAddVideo) {
      mixedItems.push(videos[videoIndex]);
      videoIndex++;
    } else if (imageIndex < images.length) {
      mixedItems.push(images[imageIndex]);
      imageIndex++;
    }
  }

  for (const item of mixedItems) {
    const shortestColumn = columns.reduce(
      (min, col, index) => (col.height < columns[min].height ? index : min),
      0
    );

    const itemHeight = getEstimatedHeight(item);
    columns[shortestColumn].items.push(item);
    columns[shortestColumn].height += itemHeight;
  }

  const maxItems = Math.ceil(items.length / columnCount);
  const distributedItems = [];

  for (let i = 0; i < maxItems; i++) {
    for (let j = 0; j < columnCount; j++) {
      if (columns[j].items[i]) {
        distributedItems.push(columns[j].items[i]);
      }
    }
  }

  return distributedItems;
};

 const breakpointColumnsObj = {
   default: 5,
   1440: 4,
   1200: 3,
   1024: 3,
   768: 2,
   500: 2,
 };

 // Get current column count based on window width
 const getColumnCount = () => {
   const width = window.innerWidth;
   if (width > 1440) return 5;
   if (width > 1200) return 4;
   if (width > 1024) return 3;
   if (width > 768) return 2;
   return 1;
 };

 // Distribute items by height
 const distributedItems = useMemo(() => {
   return distributeItems(archiveItems, getColumnCount());
 }, [dimensions, window.innerWidth]);

 return (
   <div className="archives-wrapper">
     <BackgroundSection>
       <BlurElement />
       <BlurElement />
       <BlurElement />
     </BackgroundSection>
     <div className="archives-container">
       <Masonry
         breakpointCols={breakpointColumnsObj}
         className="my-masonry-grid"
         columnClassName="my-masonry-grid_column"
       >
         {distributedItems.map((item, index) => renderArchiveItem(item, index))}
       </Masonry>
     </div>
   </div>
 );
};

export default Archives;
