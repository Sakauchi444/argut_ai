import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	if (!process.env.API_ENDPOINT) return;
	const endpoint = `${process.env.API_ENDPOINT}/judge-ai`;
	const { chatCodeId, message } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chatCodeId,
			message,
		}),
	});
	const data = await res.json();

	if (res.status === 200) {
		return Response.json({ ...data });
	}
	return Response.error();
}
