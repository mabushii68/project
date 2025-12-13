import React, { useRef, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Snowfall = () => {
  /* 눈 효과를 그릴 canvas DOM 참조 */
  const canvasRef = useRef(null);

  /* 현재 테마(dark / light)에 따라 색상을 변경하기 위한 Context 사용 */
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    /* 캔버스를 화면 전체 크기로 설정 */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const numSnowflakes = 25;

    /* 눈송이 초기 위치 및 크기 랜덤 생성 */
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        density: Math.random() * numSnowflakes
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* 테마에 따라 눈송이 색상 변경 */
      ctx.fillStyle =
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(128, 128, 128, 0.5)';

      ctx.beginPath();
      for (let i = 0; i < numSnowflakes; i++) {
        const flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
      }
      ctx.fill();

      update();
    };

    const update = () => {
      for (let i = 0; i < numSnowflakes; i++) {
        const flake = snowflakes[i];

        /* 눈송이를 아래 방향으로 이동 */
        flake.y += Math.pow(flake.radius, 0.5) * 0.5;

        /* 화면을 벗어나면 상단에서 다시 생성 */
        if (flake.y > canvas.height) {
          flake.y = -5;
          flake.x = Math.random() * canvas.width;
        }
      }
    };

    let animationFrameId;

    /* requestAnimationFrame 기반 애니메이션 루프 */
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    /* 화면 크기 변경 시 캔버스 크기 동기화 */
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    /* 컴포넌트 언마운트 시 리소스 정리 */
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };

  }, [theme]); // 테마 변경 시 눈 색상 갱신

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Snowfall;
