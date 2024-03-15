import Initialize from "@/components/Features/Initialize";
import LogOverlay from "@/components/Features/LogOverlay";
import WaitOverlay from "@/components/Features/WaitOverlay";
import { PhaseTitles, Phases } from "@/constants";
import { ActionIcon, Box, Button, Center, Container, Flex, Overlay, Title } from "@mantine/core";
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
	const [logVisible, setLogVisible] = useState(false);
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
		} else if (argutiaPhase === "speaker2-rebuttal") {
			setReadIndex(2);
		} else if (argutiaPhase === "speaker2-closing-arguments") {
			setReadIndex(3);
		}
		return () => setReadIndex(0);
	}, [argutiaPhase]);

	const handleNextPhase = () => {
		setArgutiaPhase((prev) => Phases[Phases.indexOf(prev) + 1] || Phases[0]);
		setEnd(false);
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
	const readText = isSpeaker1
		? _data.speaker1.comments[readIndex]
		: _data.speaker2.comments[readIndex];
	const { ref, replay } = useScramble({
		text: readText,
		speed: 0.4 * option.playbackSpeed * (option.isPaused || argutiaPhase === "initialize" ? 0 : 1),
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
				<Box mb={"md"}>
					<Title>議題: {_data.agenda}</Title>
					<Title size={"h4"}>
						フェーズ {isSpeaker1 ? _data.speaker1.position : _data.speaker2.position}-{PhaseTitle}
					</Title>
				</Box>
				<Flex flex={1}>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pos="relative">
						<Image
							src={"/images/ずんだもん_0001.png"}
							alt={"Player1"}
							fill
							sizes="25%"
							style={{ transform: "scale(-1, 1)", objectFit: "contain" }}
						/>
						<Title>
							{_data.speaker1.position}: {_data.speaker1.model}
						</Title>
					</Flex>
					<Flex
						flex={"0 1 50%"}
						className={`
							${classes.speech_bubble_container}
							${isSpeaker1 ? classes.left : classes.right}
						`}
					>
						{/* // TODO: ↓吹き出しコンポーネント切り出し */}
						<Box
							w={"100%"}
							className={`
								${classes.speech_bubble} 
								${!isSpeaker1 && classes.direction_rtl}
								${classes.scrollbar}
							`}
						>
							<Title
								size={"h3"}
								c={"var(--mantine-color-text)"}
								className={`
									${end && classes.text}
									${!isSpeaker1 && classes.direction_ltr}
								`}
								ref={ref}
							/>
							{end && (
								<Flex
									justify={"space-around"}
									className={`${!isSpeaker1 && classes.direction_ltr}`}
								>
									<Button
										variant="gradient"
										gradient={{ from: "pink", to: "yellow" }}
										c={"var(--mantine-color-white)"}
										onClick={replay}
										size={"lg"}
									>
										もう一度
									</Button>
									<Button
										variant="gradient"
										gradient={{ from: "pink", to: "yellow" }}
										c={"var(--mantine-color-white)"}
										size="lg"
										onClick={handleNextPhase}
									>
										{argutiaPhase === "speaker2-closing-arguments" ? "終了する" : "次へ進む"}
									</Button>
								</Flex>
							)}
						</Box>
					</Flex>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pos="relative">
						<Image
							src={"/images/ずんだもん_0001.png"}
							alt={"Player2"}
							fill
							sizes="25%"
							style={{ objectFit: "contain" }}
						/>
						<Title>
							{_data.speaker2.position}: {_data.speaker2.model}
						</Title>
					</Flex>
				</Flex>
				{/* TODO: ↓コンポーネント切り出し */}
				<Flex justify={"space-around"} className={classes.menu}>
					<ActionIcon
						variant="gradient"
						gradient={{ from: "pink", to: "yellow" }}
						size={"lg"}
						w={"70px"}
						onClick={() => {
							setLogVisible(!logVisible);
						}}
					>
						<IconMessage />
					</ActionIcon>
					<ActionIcon
						variant="gradient"
						gradient={{ from: "pink", to: "yellow" }}
						size={"lg"}
						w={"70px"}
						onClick={() => setOption({ ...option, isPaused: !option.isPaused })}
					>
						{option.isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
					</ActionIcon>
					<Button
						variant="gradient"
						gradient={{ from: "pink", to: "yellow" }}
						onClick={handlePlaybackSpeed}
						w={"70px"}
					>{`x${option.playbackSpeed.toFixed(1)}`}</Button>
				</Flex>
			</Container>
			{option.isPaused && (
				<Overlay color="#000" backgroundOpacity={0.85}>
					<Center h={"100%"}>
						<Title>Paused</Title>
					</Center>
				</Overlay>
			)}
			{logVisible && <LogOverlay speaker1={_data.speaker1} speaker2={_data.speaker2} />}
			{argutiaPhase === "waiting" && <WaitOverlay />}
		</div>
	);
};

export default Argutia;
