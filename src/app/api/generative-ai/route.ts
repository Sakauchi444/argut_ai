import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	if (!process.env.API_ENDPOINT) return;
	const endpoint = `${process.env.API_ENDPOINT}/generative-ai`;
	const { conversationId, chatCodeId, message, bot, position, section } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ conversationId, chatCodeId, message, bot, position, section }),
	});
	const data = await res.json();

	return Response.json({ ...data });
}
