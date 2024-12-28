"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxBackground() {
	const backgroundRef = useRef(null);

	useEffect(() => {
		const background = backgroundRef.current;
		let ticking = false;

		const updatePosition = () => {
			if (!background) return;

			const totalScrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = window.scrollY;
			const scrollProgress = scrolled / totalScrollHeight;

			const imageHeight = background.offsetHeight;
			const windowHeight = window.innerHeight;
			const moveRange = imageHeight - windowHeight;

			const parallaxValue = -moveRange * scrollProgress;

			background.style.transform = `translateY(${parallaxValue}px)`;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updatePosition);
				ticking = true;
			}
		};

		updatePosition();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", updatePosition, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", updatePosition);
		};
	}, []);

	return (
		<div
			style={{
				position: "fixed",
				width: "100%",
				height: "100vh",
				top: 0,
				left: 0,
				zIndex: -1,
				backgroundColor: "#000",
				overflow: "hidden",
			}}
			className="md:mt-[140px] mt-[250px]"
		>
			<div
				ref={backgroundRef}
				className="relative w-full"
				style={{
					height: "150vh",
					maxWidth: "2400px", // 최대 너비 제한
					margin: "0 auto", // 중앙 정렬
				}}
			>
				<Image
					src="/bg.jpg"
					alt="background_img"
					fill
					priority
					quality={100}
					sizes="(max-width: 2400px) 100vw, 2400px"
					className="object-cover object-center"
					style={{
						objectPosition: "center",
						width: "100%",
						height: "100%",
					}}
				/>
			</div>
		</div>
	);
}
