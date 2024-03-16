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
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import classes from "./argutia.module.css";

type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Argutia: FC<Props> = ({ data, setData, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = useState<ArgutiaPhase>("initialize");
	const [readIndex, setReadIndex] = useState(0);
	const [end, setEnd] = useState(false);
	const [option, setOption] = React.useState<ArgutiaOption>({
		isPaused: false,
		playbackSpeed: 1,
	});

	useEffect(() => {
		if (argutiaPhase === "speaker1-arguments") {
			setReadIndex(0);
		} else if (argutiaPhase === "speaker2-arguments") {
			setReadIndex(1);
		} else if (argutiaPhase === "speaker1-rebuttal") {
			setReadIndex(2);
		} else if (argutiaPhase === "speaker1-closing-arguments") {
			setReadIndex(3);
		} else if (argutiaPhase === "end") {
			setTimeout(() => {
				// アニメーション見せてからリザルトに移行
				setPhase("result");
			}, 4000);
		}
		return () => setReadIndex(0);
	}, [argutiaPhase, setPhase]);

	const handleNextPhase = () => {
		setEnd(false);
		if (argutiaPhase === "speaker2-cross-examination") {
			setReadIndex(1);
		} else if (argutiaPhase === "speaker1-cross-examination") {
			setReadIndex(2);
		} else if (argutiaPhase === "speaker2-rebuttal") {
			setReadIndex(3);
		}
		setArgutiaPhase((prev) => Phases[Phases.indexOf(prev) + 1] || Phases[0]);
	};
	const PhaseTitle = PhaseTitles[argutiaPhase];

	const isSpeaker1 = /^speaker1/.test(argutiaPhase);

	// TODO: データに切り替える
	const text =
		"空が青く見える理由は主に以下の2点です。\n\n1. 光の散乱現象\n太陽光が大気中の分子や微小な粒子に当たって散乱される際、短波長の青い光線はより強く散乱される性質があるため、目に入る光の主体が青味を帯びた光になります。\n\n2. 酸素分子\n大気中に含まれる酸素分子は、赤外線領域の波長の光を吸収しやすく、青~緑方向の短波長の光を透過しやすい特性があります。\n\nつまり、空は青く見えるのは、大気中を進む光が短波長の青い光を選択的に散乱・透過する性質に起因している、というのが通説です。ただし晴れた空の青さは、時間や位置によって若干異なります。";

	const _data: ArgutiaData = {
		agenda: "空が青い理由",
		speaker1: {
			model: "GPT-4",
			position: "賛成",
			comments: [`賛成: ${text}`, `賛成: ${text}2`, `賛成: ${text}3`, `賛成: ${text}4`],
		},
		speaker2: {
			model: "GPT-4",
			position: "反対",
			comments: [`反対${text}`, `反対: ${text}2`, `反対${text}3`, `反対${text}4`],
		},
	};
	const readText =
		argutiaPhase === "end"
			? ""
			: isSpeaker1
			  ? _data.speaker1.comments[readIndex]
			  : _data.speaker2.comments[readIndex];

	const { ref, replay } = useScramble({
		text: readText,
		speed:
			0.4 *
			option.playbackSpeed *
			(option.isPaused || argutiaPhase === "initialize" || argutiaPhase === "end" ? 0 : 1),
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
		return <Initialize setArgutiaPhase={setArgutiaPhase} />;
	}
	return (
		<div className={classes.root}>
			<Container component={Flex} size={"lg"} h={"100%"} p={0} style={{ flexDirection: "column" }}>
				{/* // TODO: ↓コンポーネント切り出し */}
				<Box mb={"md"} px={"md"}>
					<Title>議題: {_data.agenda}</Title>
					<Title size={"h4"}>
						フェーズ {isSpeaker1 ? _data.speaker1.position : _data.speaker2.position}-{PhaseTitle}
					</Title>
				</Box>
				<Flex flex={1}>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pl={"sm"} ta={"center"}>
						<Box pos="relative" flex={"1 1 90%"}>
							<Image
								src={"/images/ずんだもん_0001.png"}
								alt={"Player1"}
								fill
								sizes="25%"
								style={{ transform: "scale(-1, 1)", objectFit: "contain" }}
							/>
						</Box>
						<Title order={4}>
							{_data.speaker1.position}
							<br />
							{_data.speaker1.model}
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
								<Button onClick={replay} size={"md"}>
									もう一度
								</Button>
								<Button size="md" onClick={handleNextPhase}>
									{argutiaPhase === "speaker1-closing-arguments" ? "終了する" : "次へ進む"}
								</Button>
							</Flex>
						)}
					</SpeechBubble>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pr={"md"} ta={"center"}>
						<Box pos="relative" flex={"1 1 90%"}>
							<Image
								src={"/images/ずんだもん_0001.png"}
								alt={"Player2"}
								fill
								sizes="25%"
								style={{ objectFit: "contain" }}
							/>
						</Box>
						<Title order={4}>
							{_data.speaker2.position}
							<br />
							{_data.speaker2.model}
						</Title>
					</Flex>
				</Flex>
				{/* TODO: ↓コンポーネント切り出し */}
				<Flex justify={"space-around"} className={classes.menu}>
					<LogOverlay speaker1={_data.speaker1} speaker2={_data.speaker2}>
						<Box w="34px">
							<IconMessage />
						</Box>
					</LogOverlay>
					<ActionIcon
						size={"lg"}
						w={"70px"}
						onClick={() => setOption({ ...option, isPaused: !option.isPaused })}
					>
						{option.isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
					</ActionIcon>
					<Button onClick={handlePlaybackSpeed} w={"70px"}>
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
			{argutiaPhase === "waiting" && <WaitOverlay />}
			{argutiaPhase === "end" && <EndOverlay />}
		</div>
	);
};

export default Argutia;
