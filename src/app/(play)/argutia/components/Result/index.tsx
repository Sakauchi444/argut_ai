import SpeechBubble from "@/components/Atoms/SpeechBubble";
import LogOverlay from "@/components/Features/LogOverlay";
import { Box, Button, Container, Flex, Text, rem } from "@mantine/core";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./result.module.css";

type Props = {
	data: ArgutiaData;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Result: FC<Props> = ({ data, setPhase }) => {
	// TODO: fetch judge API

	const _result_data = {
		winner: "speaker1",
		model: "GPT-4",
		text: "スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。",
	};

	return (
		<div className={classes.root}>
			<Container size={"xl"}>
				<Flex direction={"column"} w={"100%"} align={"center"} gap="md">
					<Flex gap="xl">
						<Box pos="relative">
							<Image src={"/images/zunda_happy_icon.png"} width={100} height={100} alt="winner" />
						</Box>
						<Text
							variant="gradient"
							gradient={{ from: "pink", to: "yellow" }}
							fw={900}
							style={{ fontSize: rem("72px") }}
						>
							{`${data.speaker1.position} 勝ち!!`}
						</Text>
					</Flex>
					<Flex align={"center"} mah={"calc(100vh - 244px)"} gap={"xl"}>
						<Box>
							<Image
								src={"/images/zunda_icon.png"}
								width={60}
								height={60}
								alt="judge"
								style={{ transform: "scale(-1, 1)" }}
							/>
						</Box>
						<SpeechBubble direction="left">
							<Text c={"black"}>{_result_data.text}</Text>
						</SpeechBubble>
					</Flex>
					<Flex gap={"xl"}>
						<LogOverlay speaker1={data.speaker1} speaker2={data.speaker2}>
							会話を見る
						</LogOverlay>
						<Button onClick={() => setPhase("prepare")}>Topに戻る</Button>
					</Flex>
				</Flex>
			</Container>
		</div>
	);
};

export default Result;
