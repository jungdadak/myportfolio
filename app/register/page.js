"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoginModal } from "../components/auth/login-modal";
import { AnimatedCode } from "../components/greetings";
import { toast } from "react-hot-toast";
export default function Register() {
	const [showLoginModal, setShowLoginModal] = useState(false);

	// URL 파라미터 확인을 통해 모달 상태 설정
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		setShowLoginModal(searchParams.get("login") === "true");
	}, []);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// 회원가입 처리 함수
	const handleSubmit = async (e) => {
		e.preventDefault();

		// 비밀번호 확인
		if (password !== confirmPassword) {
			setError("비밀번호가 일치하지 않습니다.");
			return;
		}

		// 비밀번호 유효성 검사
		if (password.length < 8) {
			setError("비밀번호는 8자 이상이어야 합니다.");
			return;
		}

		if (!/[A-Z]/.test(password)) {
			setError("비밀번호에 대문자가 포함되어야 합니다.");
			return;
		}

		if (!/[0-9]/.test(password)) {
			setError("비밀번호에 숫자가 포함되어야 합니다.");
			return;
		}

		if (!/[!@#$%^&*]/.test(password)) {
			setError("비밀번호에 특수문자(!@#$%^&*)가 포함되어야 합니다.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (!response.ok) {
				toast.error(data.error || "회원가입에 실패했습니다");
				return;
			}
			toast.success("환영합니다~! 회원가입이 완료되었습니다.");
			// 회원가입 성공 시 로그인 페이지로 이동
			setShowLoginModal(true);
		} catch (error) {
			console.error("Registration failed:", error);
			toast.error("회원가입 중 오류가 발생했습니다");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* 로그인 모달 */}
			{showLoginModal && (
				<LoginModal
					isOpen={showLoginModal}
					onOpenChange={() => setShowLoginModal(false)}
				/>
			)}
			<div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black py-12 px-2 sm:px-6 lg:px-8">
				<div className="max-w-md mx-auto">
					{/* 뒤로가기 버튼 */}
					<Link
						href="/"
						className="inline-flex items-center text-white mb-8 hover:text-gray-300"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						돌아가기
					</Link>

					<div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
						{/* 헤더 이미지 */}
						<div className="relative h-48">
							<Image
								src="/images/projects/portfolio.png"
								alt="Portfolio Background"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="opacity-90 object-cover object-center"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800"></div>
						</div>

						{/* 회원가입 폼 */}
						<div className="p-8">
							<div className="text-center mb-6">
								<AnimatedCode />
								<h2 className="mt-4 text-2xl font-bold text-white">회원가입</h2>
								<p className="mt-2 text-sm text-gray-400">
									새로운 계정을 만들어 다양한 서비스를 이용해보세요
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{error && (
									<div
										className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded relative"
										role="alert"
									>
										<span className="block sm:inline">{error}</span>
									</div>
								)}

								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										id="name"
										name="name"
										type="text"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="이름"
									/>
								</div>

								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10 pr-3 py-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="이메일"
									/>
								</div>

								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="new-password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 pr-10 py-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="비밀번호"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
										aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>

								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										id="confirmPassword"
										name="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										autoComplete="new-password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="pl-10 pr-10 py-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
										placeholder="비밀번호 확인"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
										aria-label={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
									>
										{showConfirmPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>

								<div className="text-sm text-gray-400">
									<ul className="list-disc list-inside space-y-1">
										<li>비밀번호는 8자 이상이어야 합니다</li>
										<li>대문자를 포함해야 합니다</li>
										<li>숫자를 포함해야 합니다</li>
										<li>특수문자(!@#$%^&*)를 포함해야 합니다</li>
									</ul>
								</div>

								<button
									type="submit"
									disabled={isLoading}
									className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
								>
									{isLoading ? "가입 중..." : "회원가입"}
								</button>

								<div className="text-center text-sm text-gray-400">
									이미 계정이 있으신가요?{" "}
									<button
										type="button"
										onClick={() => setShowLoginModal(true)}
										className="text-indigo-400 hover:text-indigo-300 bg-transparent border-none p-0 underline cursor-pointer"
									>
										로그인하기
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
