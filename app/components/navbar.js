export default function Navbar() {
	return (
		<div className="navbar-bg">
			<h4>
				Andy Lee <span className="text-green-200 ml-3"> Developer Portfolio</span>
			</h4>
			<div>
				<input
					type="search"
					placeholder="Search"
					className="rounded-md text-center w-[300px] bg-gray-200 mr-0 text-black font-semibold text-md"
				/>
				<button className="bg-yellow-300 rounded-md ml-1">👀</button>
			</div>
		</div>
	);
}
