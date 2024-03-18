import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fetcher = async (url: string, chatCodeId: string, message: string) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			chatCodeId: chatCodeId,
			message: message,
		}),
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

const section1 = ["立論", "反対尋問", "反駁", "最終弁論"];
const section2 = ["反対尋問", "立論", "反駁", "最終弁論"];

type Response = {
	comment: string;
	chatCodeId: string;
};

export function useRealtimeJudgeAI(
	data: ArgutiaData,
	setData: Dispatch<SetStateAction<ArgutiaData>>,
) {
	const [chatCodeId, setChatCode] = useState<string>("0");
	const [count, setCount] = useState(0);
	const [errorCount, setErrorCount] = useState(0);

	const { conversationId, agenda, speaker1: s1, speaker2: s2 } = data;
	const { position: p1, comments: c1 } = s1;
	const { position: p2, comments: c2 } = s2;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setChatCode("0");
		setCount(0);
		setErrorCount(0);
	}, [conversationId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(count, c1.length, c2.length, conversationId, errorCount, chatCodeId);

		if (c1.length !== c2.length) return;
		if (conversationId === "") return;
		if (count >= 4) return;
		if (errorCount >= 4) return;

		const getData = async () => {
			try {
				if (c1[count] && c2[count]) {
					const message = `あなたはディベートの審査員です。今回のテーマは「${agenda}」です。${p1}側の${section1[count]}と${p2}側の${section2[count]}を見て、どちらが優勢か答えてください。「優勢なのは」から回答してください。\n
            ${p1}の${section1}です。${c1[count]}\n\n
            ${p2}の${section2}です。${c2[count]}`;
					const result: Response = await fetcher("/api/judge-ai", chatCodeId, message);
					if (result.chatCodeId !== chatCodeId) {
						setChatCode(result.chatCodeId);
					}
					console.log(result.comment);
					const comment = result.comment;
					if (comment.includes(p1)) {
						setData((prev) => ({
							...prev,
							superiority: "speaker1",
						}));
					} else if (comment.includes(p2)) {
						setData((prev) => ({
							...prev,
							superiority: "speaker2",
						}));
					} else {
						setData((prev) => ({
							...prev,
							superiority: "draw",
						}));
					}
					setCount((prev) => prev + 1);
				}
			} catch {
				setErrorCount((prev) => prev + 1);
			}
		};
		getData();
	}, [count, data, errorCount]);
	console.log(data.superiority);
}
