import { bots } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fetcher = async (
	url: string,
	conversationId: string,
	chatCodeId: string,
	message: string,
	bot: string,
	speakerId: string,
	sectionId: string,
) => {

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			conversationId: conversationId,
			chatCodeId: chatCodeId,
			message: message,
			bot: bot,
			speakerId: speakerId,
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

const caseSpeaker1 = [0, 3, 5, 7];

export function useGenerativeAI(data: ArgutiaData, setData: Dispatch<SetStateAction<ArgutiaData>>) {
	const [speaker1, setSpeaker1] = useState<SpeakerWithId>({ ...data.speaker1, chatCodeId: "0" });
	const [speaker2, setSpeaker2] = useState<SpeakerWithId>({ ...data.speaker2, chatCodeId: "0" });
	const [count, setCount] = useState(0);

	const { conversationId, agenda, speaker1: s1, speaker2: s2 } = data;
	const { model: model1, position: position1 } = s1;
	const { model: model2, position: position2 } = s2;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (count >= 8) return;
		if (conversationId === "") return;

		const getData = async () => {
			try {
				if (caseSpeaker1.includes(count)) {
					const message =
						count === 0
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは「${position1}」側として意見してください。あなたは三回発言ができ、そのうち最初の一回は500文字以内で${position1}側として立論してださい。立論は現状分析・現状における問題点・問題解決のためのプラン・プラン導入後のメリット・デメリットを元に行ってください。`
							: `${position2}側の意見です。500字以内で反論してください。
          ${s2.comments[s2.comments.length - 1]}`;

					const result: Response = await fetcher(
						"/api/generative-ai",
						conversationId,
						speaker1.chatCodeId,
						message,
						bots[model1].bot,
						bots[model1].speakerId,
						String(count + 1),
					);
					if (result.chatCode === speaker1.chatCodeId) {
						// IDが前回と同じ場合、messageを配列に追加
						setData({ ...data, speaker1: { ...s1, comments: [...s1.comments, result.message] } });
					} else {
						// 異なるIDの場合、配列を初期化して新しいmessageを追加
						setData({ ...data, speaker1: { ...s1, comments: [result.message] } });
						setSpeaker1({ ...speaker1, chatCodeId: result.chatCode });
					}
				} else {
					const message =
						count === 2
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは「${position2}」側として意見してください。あなたは三回発言ができ、そのうち最初の一回は500文字以内で${position2}側として立論してださい。立論は現状分析・現状における問題点・問題解決のためのプラン・プラン導入後のメリット・デメリットを元に行ってください。`
							: `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは「${position2}」側として意見してください。${position1}側の意見です。500字以内で反論してください。
          ${s1.comments[s1.comments.length - 1]}`;
					const result: Response = await fetcher(
						"/api/generative-ai",
						conversationId,
						speaker2.chatCodeId,
						message,
						bots[model2].bot,
						bots[model2].speakerId,
						String(count + 1),
					);
					if (result.chatCode === speaker2.chatCodeId) {
						setData({ ...data, speaker2: { ...s2, comments: [...s2.comments, result.message] } });
					} else {
						setData({ ...data, speaker2: { ...s2, comments: [result.message] } });
						setSpeaker2({ ...speaker2, chatCodeId: result.chatCode });
					}
				}
			} catch (error) {
				console.error("Error fetching data: ", error);
			} finally {
				setCount((prevCount) => prevCount + 1);
			}
		};

		getData();
	}, [count, data]);

	return data;
}
