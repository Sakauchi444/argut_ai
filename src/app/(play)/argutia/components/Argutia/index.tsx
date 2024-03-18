import SpeechBubble from "@/components/Atoms/SpeechBubble";
import EndOverlay from "@/components/Features/EndOverlay";
import Initialize from "@/components/Features/Initialize";
import LogOverlay from "@/components/Features/LogOverlay";
import WaitOverlay from "@/components/Features/WaitOverlay";
import { PhaseTitles, Phases } from "@/constants";
import {
	ActionIcon,
	Box,
	Button,
	Center,
	Container,
	Flex,
	Overlay,
	Text,
	Title,
} from "@mantine/core";
import { IconMessage, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { useScramble } from "use-scramble";
import classes from "./argutia.module.css";

type Props = {
	data: ArgutiaData;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const speaker1Image = (phase: ArgutiaPhase, isLoading: boolean) => {
	if (isLoading) return "/images/zunda_think.png";
	switch (phase) {
		case "speaker1-arguments":
		case "speaker1-cross-examination":
		case "speaker1-rebuttal":
		case "speaker1-closing-arguments":
			return "/images/zunda_mic.png";
		case "speaker2-arguments":
		case "speaker2-cross-examination":
		case "speaker2-rebuttal":
		case "speaker2-closing-arguments":
			return "/images/zunda_hearing.png";
		case "initialize":
		case "end":
			return "/images/zunda_think.png";
	}
};

const speaker2Image = (phase: ArgutiaPhase, isLoading: boolean) => {
	if (isLoading) return "/images/zunda_think.png";
	switch (phase) {
		case "speaker1-arguments":
		case "speaker1-cross-examination":
		case "speaker1-rebuttal":
		case "speaker1-closing-arguments":
			return "/images/zunda_hearing.png";
		case "speaker2-arguments":
		case "speaker2-cross-examination":
		case "speaker2-rebuttal":
		case "speaker2-closing-arguments":
			return "/images/zunda_mic.png";
		case "initialize":
		case "end":
			return "/images/zunda_think.png";
	}
};

const Argutia: FC<Props> = ({ data, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = useState<ArgutiaPhase>("initialize");
	const [isLoading, setIsLoading] = useState(false);
	const [readIndex, setReadIndex] = useState(0);
	const [end, setEnd] = useState(false);
	const [option, setOption] = React.useState<ArgutiaOption>({
		isPaused: false,
		playbackSpeed: 1,
	});

	useEffect(() => {
		if (argutiaPhase === "end") {
			setTimeout(() => {
				// アニメーション見せてからリザルトに移行
				setPhase("result");
			}, 4000);
		}
	}, [argutiaPhase, setPhase]);

	const handleNextPhase = () => {
		setEnd(false);
		if (argutiaPhase === "speaker2-cross-examination") {
			setReadIndex(1);
		} else if (argutiaPhase === "speaker1-cross-examination") {
			setReadIndex(2);
		} else if (argutiaPhase === "speaker1-rebuttal") {
			setReadIndex(3);
		}
		setArgutiaPhase((prev) => Phases[Phases.indexOf(prev) + 1] || Phases[0]);
	};
	const PhaseTitle = PhaseTitles[argutiaPhase];

	const isSpeaker1 = /^speaker1/.test(argutiaPhase);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const setText = useMemo(() => {
		if (argutiaPhase === "end" || argutiaPhase === "initialize") {
			return "";
		}
		if (isSpeaker1) {
			if (data.speaker1.comments[readIndex]) {
				isLoading && setIsLoading(false);
				return data.speaker1.comments[readIndex];
			}
		} else {
			if (data.speaker2.comments[readIndex]) {
				isLoading && setIsLoading(false);
				return data.speaker2.comments[readIndex];
			}
		}
		isLoading || setIsLoading(true);
		return "";
	}, [argutiaPhase, data.speaker1.comments, data.speaker2.comments, readIndex, isSpeaker1]);

	const { ref } = useScramble({
		text: setText,
		speed:
			0.4 *
			option.playbackSpeed *
			(option.isPaused || argutiaPhase === "initialize" || argutiaPhase === "end" || isLoading
				? 0
				: 1),
		tick: 1,
		step: 1,
		seed: 0,
		scramble: 0,
		overflow: false,
		overdrive: false,
		onAnimationStart: () => {
			setEnd(false);
		},
		onAnimationEnd: () => {
			setEnd(true);
		},
	});

	const handlePlaybackSpeed = () => {
		setOption({
			...option,
			playbackSpeed: option.playbackSpeed === 2.5 ? 0.5 : option.playbackSpeed + 0.5,
		});
	};

	if (argutiaPhase === "initialize") {
		return <Initialize conversationId={data.conversationId} setArgutiaPhase={setArgutiaPhase} />;
	}
	return (
		<div className={classes.root}>
			<Container component={Flex} size={"lg"} h={"100%"} p={0} style={{ flexDirection: "column" }}>
				{/* // TODO: ↓コンポーネント切り出し */}
				<Box mb={"md"} px={"md"}>
					<Title>議題: {data.agenda}</Title>
					<Title size={"h4"}>
						フェーズ {isSpeaker1 ? data.speaker1.position : data.speaker2.position}-{PhaseTitle}
					</Title>
				</Box>
				<Flex flex={1}>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pl={"sm"} ta={"center"}>
						<Box pos="relative" flex={"1 1 90%"}>
							<Image
								src={speaker1Image(argutiaPhase, isLoading)}
								alt={"Speaker1"}
								fill
								sizes="25%"
								style={{ transform: "scale(-1, 1)", objectFit: "contain" }}
							/>
						</Box>
						<Title order={4}>
							{data.speaker1.position}
							<br />
							{data.speaker1.model}
						</Title>
					</Flex>
					<SpeechBubble direction={isSpeaker1 ? "left" : "right"} style={{ flex: "0 0 50%" }}>
						<Text
							c={"var(--mantine-color-text)"}
							className={`
								${classes.speech}
								${end && classes.rectangle}
								${!isSpeaker1 && classes.direction_ltr}
							`}
							ref={ref}
						/>
						{end && (
							<Flex
								justify={"space-around"}
								className={`${classes.next_container} ${!isSpeaker1 && classes.direction_ltr}`}
							>
								<Button size="md" onClick={handleNextPhase}>
									{argutiaPhase === "speaker1-closing-arguments" ? "終了する" : "次へ進む"}
								</Button>
							</Flex>
						)}
					</SpeechBubble>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pr={"md"} ta={"center"}>
						<Box pos="relative" flex={"1 1 90%"}>
							<Image
								src={speaker2Image(argutiaPhase, isLoading)}
								alt={"Speaker2"}
								fill
								sizes="25%"
								style={{ objectFit: "contain" }}
							/>
						</Box>
						<Title order={4}>
							{data.speaker2.position}
							<br />
							{data.speaker2.model}
						</Title>
					</Flex>
				</Flex>
				{/* TODO: ↓コンポーネント切り出し */}
				<Flex justify={"space-around"} className={classes.menu}>
					<LogOverlay speaker1={data.speaker1} speaker2={data.speaker2}>
						<Box w="34px">
							<IconMessage />
						</Box>
					</LogOverlay>
					<ActionIcon
						size={"lg"}
						w={"70px"}
						style={{ zIndex: 300 }}
						onClick={() => setOption({ ...option, isPaused: !option.isPaused })}
					>
						{option.isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
					</ActionIcon>
					<Button onClick={handlePlaybackSpeed} w={"70px"} style={{ zIndex: 300 }}>
						{`x${option.playbackSpeed.toFixed(1)}`}
					</Button>
				</Flex>
			</Container>
			{option.isPaused && (
				<Overlay color="#000" backgroundOpacity={0.85}>
					<Center h={"100%"}>
						<Title>Paused</Title>
					</Center>
				</Overlay>
			)}
			{isLoading && <WaitOverlay />}
			{argutiaPhase === "end" && <EndOverlay />}
		</div>
	);
};

export default Argutia;
