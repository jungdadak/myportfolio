// components/Navbar.js
import Link from "next/link";
import Visualizer from "./Visualizer.js";

export default function Navbar() {
	return (
		<div className="navbar-bg fixed top-0 left-0 w-full z-50">
			{/* Navbar 컨테이너 */}
			<div className="max-w-[90rem] mx-auto px-4 w-full flex flex-col md:flex-row md:items-center md:justify-between">
				{/* 브랜드 (왼쪽) */}
				<Link href="/">
					<div className="relative py-4 flex-shrink-0">
						{/* Visualizer 컴포넌트 삽입 */}
						<div className="absolute top-0 left-0 w-full h-full opacity-50 z-0">
							<Visualizer style={{ pointerEvents: "none" }} />
						</div>
						{/* 텍스트 컨텐츠 */}
						<div className="flex flex-col z-10 items-start whitespace-nowrap">
							<h1 className="text-4xl font-bold text-white ml-2 whitespace-nowrap">
								Andy Lee
							</h1>
							<span className="text-green-200 text-xl mt-1 whitespace-nowrap">
								👨‍💻 Developer Portfolio
							</span>{" "}
						</div>
					</div>{" "}
				</Link>

				{/* 링크들 (가운데) */}
				<div className="flex-1 flex justify-center md:justify-end md:ml-[20%]">
					<h6 className="text-yellow-300 flex gap-8 font-thin whitespace-nowrap">
						<Link href="/profile" className="shimmer-text whitespace-nowrap">
							About Me
						</Link>
						<Link href="/projects" className="shimmer-text whitespace-nowrap">
							Projects
						</Link>
						<Link href="/roadmap" className="shimmer-text whitespace-nowrap">
							Next Steps
						</Link>
						<Link href="/jot" className="shimmer-text whitespace-nowrap">
							Jot Log
						</Link>
					</h6>
				</div>

				{/* 검색 영역 (오른쪽) */}
				<div className="flex-1 flex justify-center md:justify-end items-center mt-4 md:mt-0">
					<div className="flex items-center justify-center">
						<input
							type="search"
							placeholder="Search"
							className="rounded-md w-full md:w-[240px] lg:w-[260px] 
                         bg-gray-200 text-black font-semibold text-md h-[40px] px-4"
						/>
						<button
							className="bg-black border border-white rounded-md ml-1 h-[40px] flex items-center justify-center"
							style={{ minWidth: "35px" }}
						>
							👀
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
