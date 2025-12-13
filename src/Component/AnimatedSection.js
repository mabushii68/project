import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection = ({ children, animationClass }) => {
  /* 요소가 화면에 진입했는지 여부를 상태로 관리 */
  const [inView, setInView] = useState(false);

  /* IntersectionObserver가 감지할 DOM 요소 참조 */
  const ref = useRef(null);

  useEffect(() => {
    /* 스크롤 위치에 따라 요소의 화면 진입 여부를 감지하는 Observer 생성 */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          /* 한 번 애니메이션 실행 후 추가 감지를 방지 */
          observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    /* 컴포넌트 언마운트 시 Observer 해제 */
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  /* 화면 진입 여부에 따라 애니메이션 클래스 적용 */
  return (
    <div ref={ref} className={inView ? animationClass : 'opacity-0'}>
      {children}
    </div>
  );
};

export default AnimatedSection;
