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

const sections = ["立論", "反対尋問", "反駁", "最終弁論"];

const caseSpeaker1 = [0, 3, 5, 7];
const caseSpeaker2 = [2, 1, 4, 6];

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
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは${position1}側として口語っぽく意見してください。あなたは4回発言ができ、そのうち最初の1回は500文字以内で${position1}側として立論してださい。立論は現状分析・現状における問題点・問題解決のためのプラン・プラン導入後のメリット・デメリットを元に行なってください。「${position1}派の私としては、」から始めてください`
							: `${position2}側の意見です。${position1}派として500字以内で${
									sections[caseSpeaker1.indexOf(count) || 0]
							  }してください。発言回数は残り${4 - (caseSpeaker1.indexOf(count) || 0)}回です。
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
						count === 1
							? `あなたはディベートの参加者を演じてください。今回のテーマは「${agenda}」についてです。あなたは${position2}側として口語っぽく意見してください。あなたは4回発言ができ、そのうち最初の1回は500文字以内で${position2}側として反対尋問してださい。反対尋問は肯定側の現状分析・肯定側の問題点は重大なものか・問題解決はするか・実行可能か・本当にメリットは発生するのか、を元に行ってください。以下が${position1}派の意見です。
              ${s1.comments[s1.comments.length - 1]}
              「${position2}派の私としては、」から始めてください`
							: `${position1}側の意見です。${position2}派として500字以内で${
									sections[caseSpeaker2.indexOf(count) || 0]
							  }してください。発言回数は残り${4 - (caseSpeaker2.indexOf(count) || 0)}回です。
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
