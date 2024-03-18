"use client";
import { Modal, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React, { useState } from "react";

// データの型定義
interface ConversationData {
	id: number;
	title: string;
	winner: string;
}

// interface CommentData {
// 	id: number;
// 	section_id: number;
// 	speaker_id: number;
// 	conversation_id: number;
// 	content: string;
// }

// interface SectionData {
// 	id: number;
// 	position_id: number;
// 	name: string;
// }

// interface SpeakerData {
// 	id: number;
// 	name: string;
// }

// interface PositionData {
// 	id: number;
// 	conversation_id: number;
// 	name: string;
// }

// テーブルデータ
const conversations: ConversationData[] = [
	{ id: 1, title: "きのこの山かたけのこの里か", winner: "GPT" },
	{ id: 2, title: "sample", winner: "Claude" },
];

// const comments: CommentData[] = [
// 	{ id: 1, section_id: 1, speaker_id: 1, conversation_id: 1, content: "やっぱきのこの山っしょ" },
// 	{ id: 2, section_id: 2, speaker_id: 2, conversation_id: 1, content: "は？にわかで草" },
// 	{
// 		id: 3,
// 		section_id: 3,
// 		speaker_id: 1,
// 		conversation_id: 1,
// 		content: "は？そちらこそ何言ってんの？",
// 	},
// 	{ id: 4, section_id: 4, speaker_id: 2, conversation_id: 1, content: "話にならんでござる" },
// ];

// const sections: SectionData[] = [
// 	{ id: 1, position_id: 1, name: "はじめ" },
// 	{ id: 2, position_id: 2, name: "に" },
// 	{ id: 3, position_id: 1, name: "さん" },
// 	{ id: 4, position_id: 2, name: "よん" },
// ];
// const speakers: SpeakerData[] = [
// 	{ id: 1, name: "Claude3" },
// 	{ id: 2, name: "GPT4" },
// ];
// const Positions: PositionData[] = [
// 	{ id: 1, conversation_id: 1, name: "きのこの山至上主義" },
// 	{ id: 2, conversation_id: 1, name: "たけのこの里しかかたん" },
// ];

const PastArgutiaPage = () => {
	const [selectedRow, setSelectedRow] = useState<ConversationData | null>(null);

	const handleRowClick = (row: ConversationData) => {
		setSelectedRow(row);
	};

	const rows = conversations.map((row) => (
		<tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
			<td>{row.id}</td>

			<td>
				<Link href={`/past_argutia/${row.id}`}>{row.title}</Link>
			</td>

			<td>{row.winner}</td>
		</tr>
	));

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Winner</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
};

export default PastArgutiaPage;
