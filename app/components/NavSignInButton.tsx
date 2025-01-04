"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { LoginModal } from "./auth/login-modal";
import { LogOut, LogIn, Loader2, User, Settings } from "lucide-react";

export function NavSignInButton() {
	const { data: session, status } = useSession();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	if (status === "loading") {
		return (
			<button disabled className="p-2 opacity-50">
				<Loader2 className="h-5 w-5 animate-spin text-white" />
			</button>
		);
	}

	if (session?.user) {
		return (
			<div className="relative">
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 hover:border-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
				>
					{session.user.image ? (
						<img
							src={session.user.image}
							alt={session.user.name ?? "User avatar"}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="h-full w-full flex items-center justify-center bg-gray-800 text-white">
							{session.user.name?.charAt(0).toUpperCase() ?? "U"}
						</div>
					)}
				</button>

				{isDropdownOpen && (
					<div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
						<div className="px-4 py-3">
							<p className="text-sm text-white">{session.user.name}</p>
							<p className="text-xs text-gray-400 truncate">{session.user.email}</p>
						</div>

						<div className="border-t border-gray-700" />

						<div className="py-1">
							<button
								className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
								onClick={() => {
									/* 프로필 처리 */
								}}
							>
								<User className="h-4 w-4" />
								프로필
							</button>
							<button
								className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
								onClick={() => {
									/* 설정 처리 */
								}}
							>
								<Settings className="h-4 w-4" />
								설정
							</button>

							<div className="border-t border-gray-700" />

							<button
								className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
								onClick={() => signOut()}
							>
								<LogOut className="h-4 w-4" />
								로그아웃
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
			>
				<LogIn className="h-4 w-4" />
				로그인
			</button>
			<LoginModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
