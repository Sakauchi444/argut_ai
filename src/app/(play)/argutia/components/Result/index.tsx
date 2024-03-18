import SpeechBubble from "@/components/Atoms/SpeechBubble";
import LogOverlay from "@/components/Features/LogOverlay";
import { Box, Button, Container, Flex, Modal, Notification, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import classes from "./result.module.css";
type Props = {
	data: ArgutiaData;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const fetcher = async (url: string, conversationId: string, speakerId: string) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			conversationId: conversationId,
			speakerId: speakerId,
		}),
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

const Result: FC<Props> = ({ data, setData, setPhase }) => {
	// TODO: fetch judge API

	const handleSubmit = async () => {
		close();
		setShow(true);
		setStatus("sending");

		const res: Response =
			selectedSpeaker &&
			(await fetcher(
				"/api/winner",
				data.conversationId,
				data[selectedSpeaker].id?.toString() || "",
			));
		if (res.status === 200) {
			setStatus("success");
		} else {
			setStatus("error");
		}
	};

	const handleNextArgutia = () => {
		setPhase("prepare");
		setData({
			conversationId: "",
			agenda: "",
			speaker1: {
				id: null,
				model: "GPT-4",
				position: "",
				comments: [],
			},
			speaker2: {
				id: null,
				model: "GPT-4",
				position: "",
				comments: [],
			},
		});
	};

	const _result_data = {
		winner: "speaker1",
		model: "GPT-4",
		text: "スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。",
	};
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState<"sending" | "success" | "error">();
	const [opened, { open, close }] = useDisclosure(false);
	const [selectedSpeaker, setSelectedSpeaker] = useState<"speaker1" | "speaker2">();

	return (
		<div className={classes.root}>
			{show && (
				<Notification
					onClose={() => setShow(false)}
					classNames={{ title: classes.title }}
					icon={<IconCheck />}
					loading={status === "sending"}
					color="teal"
					title={status}
					mt="md"
					pos={"absolute"}
					bottom={"2rem"}
					right={"2rem"}
					style={{ zIndex: 200 }}
					hidden={!show}
				>
					{status === "success"
						? "勝者が登録されました"
						: status === "error"
						  ? "エラーが発生しました"
						  : "送信中です"}
				</Notification>
			)}
			<Modal opened={opened} onClose={close} centered>
				<Flex direction={"column"} w={"100%"} align={"center"} gap="md">
					<Text>{selectedSpeaker && data[selectedSpeaker].position}を勝者として決定しますか？</Text>
					<Button onClick={handleSubmit}>決定</Button>
				</Flex>
			</Modal>

			<Container size={"xl"}>
				<Flex direction={"column"} w={"100%"} align={"center"} gap="md">
					<Flex gap="xl" align={"center"}>
						<Box pos="relative">
							<Image src={"/images/zunda_happy_icon.png"} width={60} height={60} alt="winner" />
						</Box>
						<Text
							variant="gradient"
							gradient={{ from: "pink", to: "yellow" }}
							fw={900}
							style={{ fontSize: rem(40) }}
						>
							審査員の感想
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
							<Text ta={"center"}>
								審査員
								<br />
								{_result_data.model}
							</Text>
						</Box>
						<SpeechBubble direction="left">
							<Text c={"black"}>{_result_data.text}</Text>
						</SpeechBubble>
					</Flex>
					{status && status === "success" ? (
						<Flex gap={"md"} wrap={"wrap"} justify={"center"}>
							<LogOverlay speaker1={data.speaker1} speaker2={data.speaker2}>
								会話を見る
							</LogOverlay>
							<Link href="/">
								<Button>Topに戻る</Button>
							</Link>
							<Button onClick={handleNextArgutia}>もう一度</Button>
						</Flex>
					) : (
						<>
							<Text>あなたの思う今回の勝者は…？</Text>
							<Flex gap={"md"} wrap={"wrap"} justify={"center"}>
								<Button
									onClick={() => {
										setSelectedSpeaker("speaker1");
										open();
									}}
								>
									{data.speaker1.position}
								</Button>
								<Button
									onClick={() => {
										setSelectedSpeaker("speaker2");
										open();
									}}
								>
									{data.speaker2.position}
								</Button>
							</Flex>
						</>
					)}
				</Flex>
			</Container>
		</div>
	);
};

export default Result;
