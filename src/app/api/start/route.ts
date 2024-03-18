import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	if (!process.env.API_ENDPOINT) return;
	const endpoint = `${process.env.API_ENDPOINT}/start`;
	const { title, a_position_name, a_model_id, b_position_name, b_model_id } = await req.json();

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, a_position_name, a_model_id, b_position_name, b_model_id }),
	});
	const data = await res.json();

	return Response.json({ ...data });
}
