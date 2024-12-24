import Link from "next/link";

export default function Navbar() {
	return (
		<div className="navbar-bg">
			{/* 컨테이너 역할, 가운데 정렬 + 일정 폭 고정 */}
			<div
				className="max-w-7xl mx-auto px-4 w-full whitespace-nowrap
			                flex flex-col md:flex-row md:items-center"
			>
				{/* 브랜드 (왼쪽) */}
				<div className="flex-1">
					<h4 className="flex flex-col">
						<Link href={"/"} className="ml-2">
							Andy Lee
						</Link>
						<span className="text-green-200">👨‍💻 Developer Portfolio</span>
					</h4>
				</div>

				{/* 링크들 (가운데) */}
				<div className="flex-1 flex justify-center">
					<h6 className="text-yellow-300 flex gap-12 font-thin">
						<Link href={"/profile"} className="shimmer-text">
							About Me
						</Link>
						<Link href={"/projects"} className="shimmer-text">
							Projects
						</Link>
						<Link href={"/roadmap"} className="shimmer-text">
							Next Steps
						</Link>
					</h6>
				</div>

				{/* 검색영역 (오른쪽) */}
				<div className="flex-1 flex justify-end sm:m-auto ">
					<input
						type="search"
						placeholder="Search"
						className="rounded-md text-center w-[400px] md:w-[300px] 
						           bg-gray-200 text-black font-semibold text-md"
					/>
					<button className="bg-yellow-300 rounded-md ml-1 px-2">👀</button>
				</div>
			</div>
		</div>
	);
}
