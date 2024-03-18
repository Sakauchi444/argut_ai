import { bots } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fetcher = async (
	url: string,
	conversationId: string,
	chatCodeId: string,
	message: string,
	bot: string,
	positionId: string,
	sectionId: string,
) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			conversationId: conversationId,
			chatCodeId: chatCodeId,
			message: message,
			bot: bot,
			positionId: positionId,
			sectionId: sectionId,
		}),
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

type Response = {
	chatCode: string;
	conversationId: string;
	message: string;
};

const sections = ["立論", "反対尋問", "反対尋問", "立論", "反駁", "反駁", "最終弁論", "最終弁論"];
const phase = [1, 2, 2, 1, 2, 1, 2, 1];

export function useGenerativeAI(data: ArgutiaData, setData: Dispatch<SetStateAction<ArgutiaData>>) {
	const [s1Code, setS1Code] = useState<string>("0");
	const [s2Code, setS2Code] = useState<string>("0");
	const [count, setCount] = useState(0);
	const [errorCount, setErrorCount] = useState(0);

	const { conversationId, agenda, speaker1: s1, speaker2: s2 } = data;
	const { id: id1, model: model1, position: position1 } = s1;
	const { id: id2, model: model2, position: position2 } = s2;

	const isError = errorCount >= 4;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setS1Code("0");
		setS2Code("0");
		setCount(0);
		setErrorCount(0);
	}, [conversationId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (s1.comments.length === 4 && s2.comments.length === 4) return;
		if (conversationId === "") return;
		// 最大12回まで冗長化
		if (count >= 8) return;
		if (errorCount >= 4) return;

		const getData = async () => {
			try {
				if (phase[count] === 1) {
					const message =
						count === 0
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは${position1}側として口語で意見してください。あなたは4回発言ができ、そのうち最初の1回は100文字以内で${position1}側として立論してださい。立論は現状分析・現状における問題点・問題解決のためのプラン・プラン導入後のメリット・デメリットを元に行なってください。「${position1}派の私としては、」から始めてください`
							: `あなたは${position1}派として100字以内で簡潔に${
									sections[count]
							  }してください。発言回数は残り${4 - s1.comments.length}回です。以下が${position2}側の意見です。
              ${s2.comments[s2.comments.length - 1]}`;

					const result: Response = await fetcher(
						"/api/generative-ai",
						conversationId,
						s1Code,
						message,
						bots[model1].bot,
						id1?.toString() || "",
						String(count + 1),
					);
					if (result.chatCode === s1Code) {
						// IDが前回と同じ場合、messageを配列に追加
						setData({
							...data,
							speaker1: { ...s1, comments: [...s1.comments, result.message] },
						});
					} else {
						// 異なるIDの場合、配列を初期化して新しいmessageを追加
						setData({
							...data,
							speaker1: { ...s1, comments: [result.message] },
						});
						setS1Code(result.chatCode);
					}
				} else {
					const message =
						count === 1
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは${position2}側として口語っぽく意見してください。あなたは4回発言ができ、そのうち最初の1回は100文字以内で${position2}側として反対尋問してださい。反対尋問は${position1}側の現状分析・${position1}側の問題点は重大なものか・問題解決はするか・実行可能か・本当にメリットは発生するのか、を元に行ってください。以下が${position1}派の意見です。
              ${s1.comments[s1.comments.length - 1]}
              「${position2}派の私としては、」から始めてください`
							: `あなたは${position2}派として100字以内で簡潔に${
									sections[count]
							  }してください。発言回数は残り${4 - s2.comments.length}回です。以下が${position1}側の意見です。
          			${s1.comments[s1.comments.length - 1]}`;
					const result: Response = await fetcher(
						"/api/generative-ai",
						conversationId,
						s2Code,
						message,
						bots[model2].bot,
						id2?.toString() || "",
						String(count + 1),
					);
					if (result.chatCode === s2Code) {
						setData({
							...data,
							speaker2: { ...s2, comments: [...s2.comments, result.message] },
						});
					} else {
						setData({
							...data,
							speaker2: { ...s2, comments: [result.message] },
						});
						setS2Code(result.chatCode);
					}
				}
				// 正常に終了した回数をカウント
				setCount((prevCount) => prevCount + 1);
			} catch (error) {
				setErrorCount((prev) => prev + 1);
				console.error("Error fetching data: ", error);
			}
		};
		getData();
	}, [count, conversationId, errorCount]);

	return { data, isError };
}
