export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main style={{ maxHeight: "100vh", overflow: "hidden" }}>{children}</main>;
}
