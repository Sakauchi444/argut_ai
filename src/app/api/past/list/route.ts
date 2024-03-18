import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch("https://d2ycluine3obbg.cloudfront.net/past/list");
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching data:", error);
		return NextResponse.error();
	}
}
