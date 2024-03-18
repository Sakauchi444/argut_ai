"use client";

import { Container, Flex, Grid, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ConversationDetailData {
  id: number;
  section_name: string;
  position_name: string;
  speaker_name: string;
  title: string;
  content: string;
}

const PostPage = ({ params: { id } }: { params: { id: string } }) => {
  const [conversationDetail, setConversationDetail] = useState<
    ConversationDetailData[]
  >([]);
  const [positions_a, setPositions_a] = useState<string>("");
  const [positions_b, setPositions_b] = useState<string>("");
  const [speakers_a, setSpeakers_a] = useState<string>("");
  const [speakers_b, setSpeakers_b] = useState<string>("");
  useEffect(() => {
    fetch("/api/past/detail", {
      method: "POST",
      body: JSON.stringify({
        conversationId: id,
      }),
    })
      .then(async (data) => {
        const json = await data.json();
        setConversationDetail(json);
        setPositions_a(json[0].position_name);
        setPositions_b(json[1].position_name);
        setSpeakers_a(json[0].speaker_name);
        setSpeakers_b(json[1].speaker_name);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container size="lg">
      <Title order={2}>会話ログ</Title>
      <Grid>
        <Grid.Col span={1}>{positions_a}</Grid.Col>
        <Grid.Col span={7}></Grid.Col>
        <Grid.Col span={1} offset={3}>
          {positions_b}
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={1}>{speakers_a}</Grid.Col>
        <Grid.Col span={7}></Grid.Col>
        <Grid.Col span={1} offset={3}>
          {speakers_b}
        </Grid.Col>
      </Grid>
      {conversationDetail.map((comment, index) => (
        <Paper key={comment.id} shadow="xs" style={{ marginBottom: 20 }} p="md">
          {[0, 3, 5, 7].includes(index) ? (
            <Flex align="center" gap="md">
              <Flex direction="column" gap="sm">
                <Image
                  src="/images/zunda_icon.png"
                  alt={`${comment.position_name} icon`}
                  height={50}
                  width={50}
                />
                <Text color="blue">{comment.section_name}</Text>
              </Flex>
              <Flex direction="column" gap="sm">
                <Text>{comment.content}</Text>
              </Flex>
            </Flex>
          ) : (
            <Flex
              align="center"
              gap="md"
              style={{ justifyContent: "flex-end" }}
            >
              <Flex direction="column" gap="sm">
                <Text>{comment.content}</Text>
              </Flex>
              <Flex direction="column" gap="sm">
                <Image
                  src="/images/zunda_icon.png"
                  alt={`${comment.position_name} icon`}
                  height={50}
                  width={50}
                />
                <Text color="blue">{comment.section_name}</Text>
              </Flex>
            </Flex>
          )}
        </Paper>
      ))}
    </Container>
  );
};

export default PostPage;
