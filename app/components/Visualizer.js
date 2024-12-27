"use client";

import { useEffect, useState } from "react";

export default function DigitalVisualizer() {
	const barCount = 14; // 막대 개수
	const segmentCount = 20; // 각 막대를 나누는 직사각형 개수
	const [bars, setBars] = useState(
		new Array(barCount).fill(0).map(() => new Array(segmentCount).fill(0))
	);

	useEffect(() => {
		let time = 0;

		const interval = setInterval(() => {
			setBars((prevBars) =>
				prevBars.map((segments, barIndex) =>
					segments.map((_, segmentIndex) => {
						// 다층 사인파 기반의 밝기 계산
						const xWave = Math.sin(time * 0.6 + barIndex * 0.4) * 0.5 + 0.5; // X축 기반
						const yWave = Math.cos(time * 0.5 + segmentIndex * 0.3) * 0.5 + 0.5; // Y축 기반
						const combinedWave = (xWave + yWave) / 2;
						// 최소 밝기 제한
						return Math.max(combinedWave, 0.3); // 최소 밝기 0.3
					})
				)
			);
			time += 0.1; // 애니메이션 속도
		}, 50); // 50ms 간격으로 업데이트

		return () => clearInterval(interval); // 언마운트 시 클리어
	}, []);

	return (
		<div
			className="flex items-center mt-5 gap-1 px-4 h-[15px] "
			style={{ pointerEvents: "none" }}
		>
			{bars.map((segments, barIndex) => (
				<div key={barIndex} className="w-2 flex flex-col justify-end gap-[1px]">
					{segments.map((intensity, segmentIndex) => {
						// 색상 계산 (녹색 → 노란색)
						const positionRatio = segmentIndex / segmentCount;
						const color = `rgba(${Math.floor(16 + 237 * positionRatio)}, ${Math.floor(
							185 + (224 - 185) * positionRatio
						)}, ${Math.floor(129 - 129 * positionRatio)}, ${intensity})`;

						return (
							<div
								key={segmentIndex}
								style={{
									backgroundColor: color,
									opacity: intensity, // 투명도 반영
								}}
								className="h-[3px] w-full transition-all duration-100"
							></div>
						);
					})}
				</div>
			))}
		</div>
	);
}
