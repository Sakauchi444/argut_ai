import { Footer } from "@/components/Layout/Footer";
import { HeaderMenu } from "@/components/Layout/HeaderMenu";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderMenu />
			<main style={{ minHeight: "calc(100vh - 155px)" }}>{children}</main>
			<Footer />
		</>
	);
}
