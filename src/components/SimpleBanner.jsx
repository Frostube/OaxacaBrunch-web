import React, { useEffect, useRef } from 'react';

const SimpleBanner = ({ text, speed = 7.1 }) => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);

  // Create an ABSURDLY long string
  const createRidiculouslyLongText = (originalText) => {
    const separator = ' • ';
    return Array(500).fill(originalText).join(separator) + separator;
  };

  const crazyLongText = createRidiculouslyLongText(text);

  useEffect(() => {
    const banner = bannerRef.current;
    const content = contentRef.current;
    
    if (!banner || !content) return;

    let animationId;
    let position = 0;
    
    const animate = () => {
      position -= speed;
      
      const contentWidth = content.scrollWidth;
      const containerWidth = banner.offsetWidth;
      
      if (position <= -(contentWidth - containerWidth)) {
        position = 0;
      }
      
      content.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, crazyLongText]);

  return (
    <div 
      ref={bannerRef}
      className="simple-banner"
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <div 
        ref={contentRef}
        className="banner-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          whiteSpace: 'nowrap',
          willChange: 'transform'
        }}
      >
        {/* Banner Text */}
        <span className="banner-text">
          {crazyLongText}
        </span>
      </div>
    </div>
  );
};

export default SimpleBanner;
