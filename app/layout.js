// RootLayout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar.js";
import Container from "./components/Container";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`md:pt-[140px] pt-[250px] ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="max-w-[90rem] mx-auto px-4">
					<Navbar />
					<Container>{children}</Container>
				</div>
			</body>
		</html>
	);
}
