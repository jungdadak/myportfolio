import Link from "next/link";
import Visualizer from "./Visualizer.js";

export default function Navbar() {
	return (
		<div className="navbar-bg top-0">
			{/* 컨테이너 역할, 가운데 정렬 + 일정 폭 고정 */}
			<div
				className="max-w-7xl mx-auto px-4 w-full whitespace-nowrap
			                flex flex-col md:flex-row md:items-center md:gap-4"
			>
				{/* 브랜드 (왼쪽) */}
				<div className="flex-1 relative py-4 md:mr-4">
					{/* Visualizer 컴포넌트 삽입 */}
					<div className="absolute top-0 left-0 w-full h-full opacity-50 z-0">
						<Visualizer />
					</div>
					{/* 텍스트 컨텐츠 */}
					<div className="flex flex-col z-10 relative items-start">
						<Link href={"/"} className="text-4xl font-bold text-white ml-2">
							Andy Lee
						</Link>
						<span className="text-green-200 text-xl mt-1">
							👨‍💻 Developer Portfolio
						</span>
					</div>
				</div>

				{/* 링크들 (가운데) */}
				<div className="flex-1 flex justify-center md:justify-start md:ml-8">
					<h6 className="text-yellow-300 flex gap-8 font-thin">
						<Link href={"/profile"} className="shimmer-text">
							About Me
						</Link>
						<Link href={"/projects"} className="shimmer-text">
							Projects
						</Link>
						<Link href={"/roadmap"} className="shimmer-text">
							Next Steps
						</Link>
						<Link href={"/jot"} className="shimmer-text">
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
							className="rounded-md w-[70%] md:w-[240px] lg:w-[260px] 
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
