import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	if (!process.env.API_ENDPOINT) return;
	const endpoint = `${process.env.API_ENDPOINT}/post-winner`;
	const { conversationId, speakerId } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ conversationId, speakerId }),
	});
	const data = await res.json();

	return Response.json({ status: res.status, ...data });
}
