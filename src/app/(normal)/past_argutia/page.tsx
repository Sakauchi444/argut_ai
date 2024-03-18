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
    // APIルートからデータを取得する
    fetch("/api/past_argutia")
      .then((response) => response.json())
      .then((data) => {
        const parsedBody = JSON.parse(data.body);
        setConversations(parsedBody);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRowClick = (row: ConversationData) => {
    setSelectedRow(row);
  };

  const rows = conversations.map((row, index) => (
    <Table.Tr
      key={index}
      onClick={() => handleRowClick(row)}
      style={{ cursor: "pointer" }}
    >
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
