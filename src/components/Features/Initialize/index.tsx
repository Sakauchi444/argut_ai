import Loading from "@/components/Atoms/Loading";
import { LoadingPhrases } from "@/constants";
import { Center, Container, Title } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import classes from "./initialize.module.css";

type Props = {
	setArgutiaPhase: React.Dispatch<React.SetStateAction<ArgutiaPhase>>;
};

const initialize: FC<Props> = ({ setArgutiaPhase }) => {
	const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * LoadingPhrases.length));

	useEffect(() => {
		const timerId = setInterval(() => {
			setPhraseIndex(Math.floor(Math.random() * LoadingPhrases.length));
			// TODO: レスポンスを受け取ったら次のフェーズに遷移
			setArgutiaPhase("speaker1-arguments");
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
