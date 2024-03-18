import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	// if (!process.env.API_ENDPOINT) return;
	const endpoint = "https://d2ycluine3obbg.cloudfront.net/past/detail";
	const { conversationId } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			conversationId,
		}),
	});
	const data = await res.json();

	return Response.json(data);
}
