import { ActionIcon, Box, Button, Container, Flex, Grid, GridCol, Title } from "@mantine/core";
import { IconMessage, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./argutia.module.css";

type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData | null>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Argutia: FC<Props> = ({ data, setData, setPhase }) => {
	const [argutiaPhase, setArgutiaPhase] = React.useState<ArgutiaPhase>("initialize");
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

	return (
		<div className={classes.root}>
			<Container component={Flex} size={"lg"} h={"100%"} style={{ flexDirection: "column" }}>
				<Box>
					<Title>議題: {data.agenda}</Title>
					<Title size={"h4"}>フェーズ: {argutiaPhase}</Title>
				</Box>
				<Grid flex={1}>
					<GridCol span={3}>
						<Box bg={"red"} />
						<Title>モデル1: {data.model1}</Title>
					</GridCol>
					<GridCol span={6}>
						<Box bg={"red"} />
					</GridCol>
					<GridCol span={3}>
						<Box bg={"red"} />
						<Title>モデル2: {data.model2}</Title>
					</GridCol>
				</Grid>
				{/* TODO: ↓コンポーネント切り出し */}
				<Flex justify={"space-around"}>
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
					>{`x${option.playbackSpeed.toFixed(1)}`}</Button>
				</Flex>
			</Container>
		</div>
	);
};

export default Argutia;
