"use client";
import { Container, Table } from "@mantine/core";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface ConversationData {
	id: number;
	title: string;
	winner: string;
}

const PastArgutiaPage = () => {
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [selectedRow, setSelectedRow] = useState<ConversationData | null>(null);

	useEffect(() => {
		fetch("https://d2ycluine3obbg.cloudfront.net/past/list")
			.then((response) => response.json())
			.then((data) => {
				const parsedBody = JSON.parse(data.body);
				const conversationData: ConversationData[] = parsedBody.map((item: any) => ({
					id: item[0],
					title: item[1],
					winner: item[2],
				}));
				setConversations(conversationData);
				console.log(data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const handleRowClick = (row: ConversationData) => {
		setSelectedRow(row);
	};

	const rows = conversations.map((row) => (
		<Table.Tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
			<Table.Td>{row.id}</Table.Td>
			<Table.Td>
				<Link href={`/past_argutia/${row.id}`}>{row.title}</Link>
			</Table.Td>
			<Table.Td>{row.winner}</Table.Td>
		</Table.Tr>
	));

	return (
		<Container size="lg">
			<Table verticalSpacing="lg">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>ID</Table.Th>
						<Table.Th>Title</Table.Th>
						<Table.Th>Winner</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Container>
	);
};

export default PastArgutiaPage;
