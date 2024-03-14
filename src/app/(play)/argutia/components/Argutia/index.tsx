import { ActionIcon, Box, Button, Center, Container, Flex, Overlay, Title } from "@mantine/core";
import { IconMessage, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useScramble } from "use-scramble";
import Initialize from "@/components/Features/Initialize";
import classes from "./argutia.module.css";
import LogOverlay from "@/components/Features/LogOverlay";

type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Argutia: FC<Props> = ({ data, setData, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = useState<ArgutiaPhase>("initialize");
	const [logVisible, setLogVisible] = useState(false);
	const [end, setEnd] = useState(false);
	const [option, setOption] = React.useState<ArgutiaOption>({
		isPaused: false,
		playbackSpeed: 1,
	});

	// TODO: データに切り替える
	const text =
		"CSSで作成された吹き出しについての質問をありがとうございます。overflow-y: auto;を設定するとスクロールが可能になるものの、::afterで作成した吹き出しの尾部分が見えなくなってしまう問題に直面しているとのことです。この問題は、overflow-y: auto;を設定した要素内に::afterを配置しているため、スクロール可能なエリア内に吹き出しの尾が含まれてしまい、そのエリアがスクロールされると尾部分が見えなくなってしまうことに起因します。解決策の一つとして、吹き出しの尾部分を別の要素として外に出し、吹き出し本体（テキストを含む部分）とは別に配置する方法があります。こうすることで、吹き出しの本体がスクロール可能になっても、尾部分が常に表示されるようになります。以下はその実装方法の例です。CSSで作成された吹き出しについての質問をありがとうございます。overflow-y: auto;を設定するとスクロールが可能になるものの、::afterで作成した吹き出しの尾部分が見えなくなってしまう問題に直面しているとのことです。この問題は、overflow-y: auto;を設定した要素内に::afterを配置しているため、スクロール可能なエリア内に吹き出しの尾が含まれてしまい、そのエリアがスクロールされると尾部分が見えなくなってしまうことに起因します。解決策の一つとして、吹き出しの尾部分を別の要素として外に出し、吹き出し本体（テキストを含む部分）とは別に配置する方法があります。こうすることで、吹き出しの本体がスクロール可能になっても、尾部分が常に表示されるようになります。以下はその実装方法の例です。";
	
	const dummy: Speaker = {
		model: "GPT-4",
		position: "賛成",
		comments: [text, `${text}2`],
	}
		// TODO: アニメーション開始のタイミングの調整
	const { ref } = useScramble({
		text: text,
		speed: 0.6 * option.playbackSpeed * (option.isPaused ? 0 : 1),
		tick: 1,
		step: 1,
		seed: 0,
		scramble: 0,
		overflow: false,
		overdrive: false,
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
			<Container component={Flex} size={"lg"} h={"100%"} style={{ flexDirection: "column" }}>
				{/* // TODO: ↓コンポーネント切り出し */}
				<Box>
					<Title>議題: {data.agenda}</Title>
					<Title size={"h4"}>フェーズ: {argutiaPhase}</Title>
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
							{data.speaker1.position}: {data.speaker1.model}
						</Title>
					</Flex>
					<Flex
						flex={"0 0 50%"}
						className={`${classes.speech_bubble_container} ${
							argutiaPhase === "speaker1" ? classes.left : classes.right
						}`}
					>
						{/* // TODO: ↓吹き出しコンポーネント切り出し */}
						<Box
							w={"100%"}
							className={`${classes.speech_bubble} 
								${argutiaPhase !== "speaker1" && classes.direction_rtl}
								${classes.scrollbar}
							`}
						>
							<Title
								size={"h3"}
								c={"var(--mantine-color-text)"}
								className={`
									${end && classes.text}
									${argutiaPhase !== "speaker1" && classes.direction_ltr}
								`}
								ref={ref}
							/>
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
							{data.speaker2.position}: {data.speaker2.model}
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
							setLogVisible(!logVisible)
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
			{logVisible && (
				<LogOverlay speaker1={dummy} speaker2={dummy} />
			)}
		</div>
	);
};

export default Argutia;
