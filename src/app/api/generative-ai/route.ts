import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	if (!process.env.API_ENDPOINT) return;
	const endpoint = `${process.env.API_ENDPOINT}/generative-ai`;
	const { conversationId, chatCodeId, message, bot, positionId, sectionId } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			conversationId,
			chatCodeId,
			message,
			bot,
			positionId,
			sectionId,
		}),
	});
	const data = await res.json();

	if (res.status === 200) {
		return Response.json({ ...data });
	}
	return Response.error();
}
