"use client";

import Link from "next/link";
import React from "react";

const AboutSection: React.FC = () => {
	return (
		<section className="group relative flex-shrink-0 w-full h-[35vh] snap-start flex items-center justify-center text-white transition-all duration-300 border-b border-gray-700/50 bg-gradient-to-b from-black to-gray-900/50 overflow-hidden">
			{/* 상단 비디오 */}
			<div className="absolute left-0 w-full h-full top-0 opacity-0 transition-opacity transition-transform duration-700 z-0 [clip-path:inset(0_0_50%_0)] group-hover:opacity-100 group-hover:-translate-y-1/4">
				<video
					src="/images/projects.mp4"
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover bg-black"
				/>
			</div>

			{/* 하단 비디오 */}
			<div className="absolute left-0 w-full h-full top-0 opacity-0 transition-opacity transition-transform duration-700 z-0 [clip-path:inset(50%_0_0_0)] group-hover:opacity-100 group-hover:translate-y-1/4">
				<video
					src="/images/projects.mp4"
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover bg-black"
				/>
			</div>

			{/* 중앙 컨텐츠 */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
				<Link href="/projects">
					<div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black/20 border border-gray-800 group-hover:border-green-500/30 transition-all duration-300 transform group-hover:scale-105 cursor-pointer">
						<span className="text-3xl font-light tracking-wide group-hover:text-green-400 transition-colors duration-300">
							Projects
						</span>
					</div>
				</Link>

				<div className="mt-3 text-sm text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
					Click to view projects
				</div>
			</div>
			{/* ... */}
		</section>
	);
};

export default AboutSection;
