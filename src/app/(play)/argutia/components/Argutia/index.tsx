import { ActionIcon, Box, Button, Center, Container, Flex, Overlay, Title } from "@mantine/core";
import { IconMessage, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Initialize from "../Initialize";
import classes from "./argutia.module.css";

type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Argutia: FC<Props> = ({ data, setData, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = useState<ArgutiaPhase>("initialize");

	const [option, setOption] = React.useState<ArgutiaOption>({
		isPaused: false,
		playbackSpeed: 1,
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
							{data.position1}: {data.speaker1}
						</Title>
					</Flex>
					<Flex
						flex={"0 0 50%"}
						className={`${classes.speech_bubble_container} ${
							argutiaPhase === "speaker1" ? classes.left : classes.right
						}`}
					>
						{/* // TODO: ↓コンポーネント切り出し */}
						<Box
							w={"100%"}
							className={`${classes.speech_bubble} ${
								argutiaPhase !== "speaker1" && classes.direction_rtl
							}`}
						>
							<Title
								size={"h3"}
								c={"var(--mantine-color-text)"}
								className={argutiaPhase !== "speaker1" ? classes.direction_ltr : ""}
							>
								ここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されますここに発言が表示されます
							</Title>
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
							{data.position2}: {data.speaker2}
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
		</div>
	);
};

export default Argutia;
