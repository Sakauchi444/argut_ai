import Loading from "@/components/Atoms/Loading";
import { LoadingPhrases } from "@/constants";
import { Center, Container, Title } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import classes from "./initialize.module.css";

type Props = {
	conversationId: string;
	setArgutiaPhase: React.Dispatch<React.SetStateAction<ArgutiaPhase>>;
};

const initialize: FC<Props> = ({ conversationId, setArgutiaPhase }) => {
	const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * LoadingPhrases.length));

	useEffect(() => {
		if (conversationId !== "") return setArgutiaPhase("speaker1-arguments");
		const timerId = setInterval(() => {
			setPhraseIndex(Math.floor(Math.random() * LoadingPhrases.length));
		}, 5000); // 5秒ごとにフレーズを更新

		return () => clearInterval(timerId);
	}, [setArgutiaPhase, conversationId]);

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
