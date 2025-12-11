import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection = ({ children, animationClass }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setInView(true);
          // No need to observe any more
          observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div ref={ref} className={inView ? animationClass : 'opacity-0'}>
      {children}
    </div>
  );
};

export default AnimatedSection;

