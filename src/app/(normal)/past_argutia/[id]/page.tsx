import { Container, Flex, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";

interface CommentData {
	id: number;
	section_name: string;
	position_name: string;
	speaker_name: string;
	content: string;
}

const comments: CommentData[] = [
	{
		id: 1,
		section_name: "立論",
		position_name: "肯定",
		speaker_name: "Claude3",
		content: "やっぱきのこの山っしょ",
	},
	{
		id: 2,
		section_name: "反対尋問",
		position_name: "否定",
		speaker_name: "ChatGPT",
		content: "は？にわかで草",
	},
	{
		id: 3,
		section_name: "立論",
		position_name: "否定",
		speaker_name: "Claude3",
		content: "は？そちらこそ何言ってんの？",
	},
	{
		id: 4,
		section_name: "反対尋問",
		position_name: "肯定",
		speaker_name: "ChatGPT",
		content: "話にならんでござる",
	},
	{
		id: 5,
		section_name: "反駁",
		position_name: "否定",
		speaker_name: "ChatGPT",
		content: "話にならんでござる",
	},
	{
		id: 6,
		section_name: "反駁",
		position_name: "肯定",
		speaker_name: "ChatGPT",
		content: "話にならんでござる",
	},
	{
		id: 7,
		section_name: "最終弁論",
		position_name: "否定",
		speaker_name: "ChatGPT",
		content: "話にならんでござる",
	},
	{
		id: 8,
		section_name: "最終弁論",
		position_name: "肯定",
		speaker_name: "ChatGPT",
		content: "話にならんでござる",
	},
];

const firstSpeaker = comments[0].speaker_name;
console.log(firstSpeaker);

const PostPage: FC = () => {
	return (
		<Container size="lg">
			<Title order={2}>会話ログ</Title>
			{comments.map((comment) => (
				<Paper key={comment.id} shadow="xs" style={{ marginBottom: 20 }}>
					{comment.speaker_name === firstSpeaker ? (
						<Flex align="center" gap="md">
							<Image
								src="/images/zunda_icon.png"
								alt={`${comment.position_name} icon`}
								height={50}
								width={50}
							/>
							<Flex direction="column" gap="sm">
								<Text>{comment.speaker_name}</Text>
								<Text color="gray">{comment.position_name}</Text>
							</Flex>
							<Flex direction="column" gap="sm">
								<Text color="blue">{comment.section_name}</Text>
								<Text>{comment.content}</Text>
							</Flex>
						</Flex>
					) : (
						<Flex align="center" gap="md" style={{ justifyContent: "flex-end" }}>
							<Flex direction="column" gap="sm">
								<Text color="blue">{comment.section_name}</Text>
								<Text>{comment.content}</Text>
							</Flex>
							<Flex direction="column" gap="sm">
								<Text>{comment.speaker_name}</Text>
								<Text color="gray">{comment.position_name}</Text>
							</Flex>
							<Image
								src="/images/zunda_icon.png"
								alt={`${comment.position_name} icon`}
								height={50}
								width={50}
							/>
						</Flex>
					)}
				</Paper>
			))}
		</Container>
	);
};

export default PostPage;
