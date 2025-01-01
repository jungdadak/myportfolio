'use client';

import React, { useEffect, useState } from 'react';

interface WaveVisualizerProps {
  className?: string;
  colorStart?: string;
  colorEnd?: string;
}

export default function WaveVisualizer({
  className = '',
  colorStart = '#10B981', // 더 선명한 초록색 (Emerald-500)
  colorEnd = '#FBBF24', // 더 선명한 노란색 (Amber-400)
}: WaveVisualizerProps) {
  const columnCount = 24;
  const rowCount = 8;

  const [values, setValues] = useState<number[][]>(() =>
    Array.from({ length: columnCount }, () =>
      Array.from({ length: rowCount }, () => 0)
    )
  );

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((column, x) =>
          column.map((_, y) => {
            // 더 역동적인 웨이브 패턴
            const horizontalWave = Math.sin(frame * 0.04 + x * 0.2) * 0.6; // 진폭 증가
            const verticalOffset = Math.sin(frame * 0.03 + y * 0.15) * 0.4; // 수직 움직임 증가
            const wave = (horizontalWave + verticalOffset + 1) / 2;

            // 최소 밝기를 0.4로 높이고, 최대 밝기는 1로 유지
            return Math.min(Math.max(wave * 0.8 + 0.4, 0.4), 1);
          })
        )
      );
      frame += 1;
    }, 40); // 애니메이션 속도 약간 증가

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 flex">
        {values.map((column, x) => (
          <div key={x} className="flex-1 flex flex-col">
            {column.map((value, y) => {
              const ratio = y / (rowCount - 1);
              const startRGB = hexToRgb(colorStart);
              const endRGB = hexToRgb(colorEnd);

              // 색상 블렌딩 시 밝기 보정
              const r = Math.round(
                startRGB.r + (endRGB.r - startRGB.r) * ratio * 1.2
              );
              const g = Math.round(
                startRGB.g + (endRGB.g - startRGB.g) * ratio * 1.2
              );
              const b = Math.round(
                startRGB.b + (endRGB.b - startRGB.b) * ratio * 1.2
              );

              return (
                <div
                  key={y}
                  className="flex-1 transition-colors duration-150"
                  style={{
                    backgroundColor: `rgba(${r}, ${g}, ${b}, ${value * 0.85})`, // 투명도 약간 조정
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// 헥스 컬러 코드를 RGB로 변환하는 헬퍼 함수
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
