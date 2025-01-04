"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { AnimatedCode } from "../greetings";

type BaseProvider = {
	name: string;
	bgColor: string;
	hoverColor: string;
	textColor?: string;
	borderColor?: string;
};

type ProviderWithIcon = BaseProvider & {
	icon: LucideIcon;
};

type ProviderWithoutIcon = BaseProvider & {
	icon?: never;
};

type Provider = ProviderWithIcon | ProviderWithoutIcon;

type Providers = {
	[key: string]: Provider;
};

interface LoginModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const providers: Providers = {
	github: {
		name: "GitHub",
		icon: Github,
		bgColor: "bg-gray-800",
		hoverColor: "hover:bg-gray-700",
	},
	google: {
		name: "Google",
		bgColor: "bg-gray-700",
		textColor: "text-white",
		borderColor: "border-gray-600",
		hoverColor: "hover:bg-gray-600",
	},
	kakao: {
		name: "카카오",
		bgColor: "bg-[#FEE500]",
		textColor: "text-gray-900",
		hoverColor: "hover:bg-[#FDD835]",
	},
	naver: {
		name: "네이버",
		bgColor: "bg-[#03C75A]",
		textColor: "text-white",
		hoverColor: "hover:bg-[#02B350]",
	},
} as const;

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: true,
				callbackUrl: "/",
			});

			if (!result?.ok) {
				setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
			}
		} catch (error) {
			console.error("Login failed:", error);
			setError("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
			aria-labelledby="login-modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div
				className="absolute inset-0"
				onClick={() => onOpenChange(false)}
				aria-hidden="true"
			/>

			<div className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-auto p-0 z-10 overflow-hidden">
				<div className="relative h-40 p-4">
					<Image
						src="/images/projects/portfolio.png"
						alt="Portfolio Background"
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						className="opacity-90 rounded-t-lg"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 rounded-t-lg"></div>
				</div>

				<div className="bg-gray-900 bg-opacity-95 p-6">
					<button
						onClick={() => onOpenChange(false)}
						className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
						aria-label="닫기"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					<div className="text-center mb-4 justify-center">
						<AnimatedCode />
						<p className="mt-4 text-sm text-white font-md">
							서비스를 이용하시려면 로그인해주세요
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						{error && <div className="text-red-400 text-sm text-center">{error}</div>}
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="pl-10 pr-3 py-2 w-full border border-gray-700 rounded-md bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								placeholder="이메일"
							/>
						</div>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="pl-10 pr-10 py-2 w-full border border-gray-700 rounded-md bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								placeholder="비밀번호"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
								aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 text-sm"
						>
							{isLoading ? "로그인 중..." : "로그인"}
						</button>
					</form>

					<div className="flex items-center my-4">
						<div className="flex-grow border-t border-gray-700"></div>
						<span className="mx-2 text-gray-400 text-xs">또는</span>
						<div className="flex-grow border-t border-gray-700"></div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						{Object.entries(providers).map(([id, provider]) => (
							<button
								key={id}
								className={`
                  flex items-center justify-center px-3 py-2 rounded-md text-sm
                  ${provider.bgColor}
                  ${provider.textColor || "text-white"}
                  ${
																			provider.borderColor ? "border " + provider.borderColor : ""
																		}
                  ${provider.hoverColor}
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                `}
								onClick={() => signIn(id, { callbackUrl: window.location.href })}
							>
								{provider.icon && <provider.icon className="w-4 h-4 mr-2" />}
								{provider.name}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
