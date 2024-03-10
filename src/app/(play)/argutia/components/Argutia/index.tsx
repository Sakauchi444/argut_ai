import { ActionIcon, Box, Button, Center, Container, Flex, Overlay, Title } from "@mantine/core";
import { IconMessage, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from "./argutia.module.css";
import Loading from "@/components/Atoms/Loading";

type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData | null>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
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
  "AIがインスピレーションの光を集めています..."
]

const Argutia: FC<Props> = ({ data, setData, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = useState<ArgutiaPhase>("initialize");
  const [phraseIndex, setPhraseIndex] = useState(0);
	const [option, setOption] = React.useState<ArgutiaOption>({
		isPaused: false,
		playbackSpeed: 1,
	});
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setPhraseIndex(Math.floor(Math.random() * LoadingPhrases.length));
    }, 5000); // 5秒ごとにフレーズを更新

    return () => clearInterval(timerId);
  }, []);

	const handlePlaybackSpeed = () => {
		setOption({
			...option,
			playbackSpeed: option.playbackSpeed === 2.5 ? 0.5 : option.playbackSpeed + 0.5,
		});
	};
	if (argutiaPhase === "initialize") {
		return <div className={classes.root}><Container component={Center} h={"100%"} size={"lg"}><Title size={"h3"} className={classes.fadeText}>{LoadingPhrases[phraseIndex]}</Title><Loading /></Container></div>;
	}

	return (
		<div className={classes.root}>
			<Container component={Flex} size={"lg"} h={"100%"} style={{ flexDirection: "column" }}>
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
						<Title>○○派: {data.model1}</Title>
					</Flex>
					<Flex flex={"0 0 50%"}>
						<Box bg={"red"} />
					</Flex>
					<Flex direction={"column"} justify={"flex-end"} flex={"0 0 25%"} pos="relative">
						<Image
							src={"/images/ずんだもん_0001.png"}
							alt={"Player1"}
							fill
							sizes="25%"
							style={{ objectFit: "contain" }}
						/>
						<Title>○○派: {data.model2}</Title>
					</Flex>
				</Flex>
				{/* TODO: ↓コンポーネント切り出し */}
				<Flex justify={"space-around"} className={classes.menu}>
					<ActionIcon variant="gradient" gradient={{ from: "pink", to: "yellow" }} size={"lg"}>
						<IconMessage />
					</ActionIcon>
					<ActionIcon
						variant="gradient"
						gradient={{ from: "pink", to: "yellow" }}
						size={"lg"}
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
		</div>
	);
};

export default Argutia;
