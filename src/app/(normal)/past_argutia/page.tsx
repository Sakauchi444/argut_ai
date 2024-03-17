"use client";
import React, { useState } from "react";
import { Modal, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// データの型定義
interface ConversationData {
  id: number;
  title: string;
  winner_id: number;
}

interface CommentData {
  id: number;
  section_id: number;
  speaker_id: number;
  conversation_id: number;
  content: string;
}

interface SectionData {
  id: number;
  position_id: number;
  name: string;
}

interface SpeakerData {
  id: number;
  name: string;
}

interface PositionData {
  id: number;
  conversation_id: number;
  name: string;
}


// テーブルデータ
const conversations: ConversationData[] = [
  { id: 1, title: "きのこの山かたけのこの里か", winner_id: 1 },
  { id: 2, title: "sample", winner_id: 2 },
];

let comments: CommentData[] = [
  {id: 1, section_id: 1, speaker_id: 1, conversation_id: 1, content: "やっぱきのこの山っしょ"},
  {id: 2, section_id: 2, speaker_id: 2, conversation_id: 1, content: "は？にわかで草"},
  {id: 3, section_id: 3, speaker_id: 1, conversation_id: 1, content: "は？そちらこそ何言ってんの？"},
  {id: 4, section_id: 4, speaker_id: 2, conversation_id: 1, content: "話にならんでござる"},
];

let sections: SectionData[] = [
  { id: 1, position_id: 1, name: "はじめ" },
  { id: 2, position_id: 2, name: "に" },
  { id: 3, position_id: 1, name: "さん" },
  { id: 4, position_id: 2, name: "よん" },
];
let speakers: SpeakerData[] = [
  {id: 1, name: "Claude3"},
  {id: 2, name: "GPT4"},
];
let Positions: PositionData[] = [
  {id: 1, conversation_id: 1, name: "きのこの山至上主義"},
  {id: 2, conversation_id: 1, name: "たけのこの里しかかたん"},
];

const PastArgutiaPage = () => {
  const [selectedRow, setSelectedRow] = useState<ConversationData | null>(null);

  const handleRowClick = (row: ConversationData) => {
    setSelectedRow(row);
    open(); // モーダルを開く
  };

  const rows = conversations.map((row) => (
    <tr
      key={row.id}
      onClick={() => handleRowClick(row)}
      style={{ cursor: "pointer" }}
    >
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.winner_id}</td>
    </tr>
  ));

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {selectedRow && (
          <div>
            <Text>Selected Row:</Text>
            <Text>ID: {selectedRow.id}</Text>
            <Text>Name: {selectedRow.title}</Text>
            <Text>Description: {selectedRow.winner_id}</Text>
          </div>
        )}
      </Modal>
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

