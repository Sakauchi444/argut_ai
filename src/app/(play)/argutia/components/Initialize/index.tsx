import Loading from "@/components/Atoms/Loading";
import { Center, Container, Title } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import classes from "./initialize.module.css";

type Props = {
	setArgutiaPhase: React.Dispatch<React.SetStateAction<ArgutiaPhase>>;
};

const LoadingPhrases = [
	"AIがストレッチをしています...",
	"AIがデジタル脳のウォームアップ中...",
	"AIが知識の海を潜っています...",
	"AIが情報の宇宙を旅しています...",
	"AIがデータの山を登っています...",
	"AIがコードの迷路を解いています...",
	"AIが思考回路をチューニング中...",
	"AIがクリエイティビティのスパークを探しています...",
	"AIが未来の予測を計算中...",
	"AIが賢さのレベルをアップグレードしています...",
	"AIが会話エンジンを暖めています...",
	"AIが知識の花を咲かせています...",
	"AIが創造性の翼を広げています...",
	"AIが質問に答える魔法をかけています...",
	"AIがインスピレーションの光を集めています...",
];

const initialize: FC<Props> = ({ setArgutiaPhase }) => {
	const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * LoadingPhrases.length));

	useEffect(() => {
		const timerId = setInterval(() => {
			setPhraseIndex(Math.floor(Math.random() * LoadingPhrases.length));

			setArgutiaPhase("speaker1"); // TODO: 後で消す
		}, 5000); // 5秒ごとにフレーズを更新

		return () => clearInterval(timerId);
	}, [setArgutiaPhase]);

	return (
		<div className={classes.root}>
			<Container component={Center} h={"100%"} size={"lg"}>
				<Title size={"h3"} className={classes.fadeText}>
					{LoadingPhrases[phraseIndex]}
				</Title>
				<Loading />
			</Container>
		</div>
	);
};

export default initialize;
