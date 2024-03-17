import SpeechBubble from "@/components/Atoms/SpeechBubble";
import LogOverlay from "@/components/Features/LogOverlay";
import { Box, Button, Container, Flex, Text, rem, Modal } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import classes from "./result.module.css";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  data: ArgutiaData;
  setPhase: Dispatch<SetStateAction<Phase>>;
};

const Result: FC<Props> = ({ data, setPhase }) => {
  // TODO: fetch judge API
  // TODO: winner decide API
  const _result_data = {
    winner: "speaker1",
    model: "GPT-4",
    text: "スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。スピーチの内容がよかったです。文章量が増えて、より詳細なフィードバックができます。また、話し方や表現力も素晴らしかったです。聴衆を引きつける力がありますね。",
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");

  return (
    <div className={classes.root}>
      <Modal opened={opened} onClose={close} centered>
        <Flex direction={"column"} w={"100%"} align={"center"} gap="md">
          <Text>{selectedSpeaker}を勝者として決定しますか？</Text>
          <Button>決定</Button>
					{/* TODO: add winner decide API */}
        </Flex>
      </Modal>
      <Container size={"xl"}>
        <Flex direction={"column"} w={"100%"} align={"center"} gap="md">
          <Flex gap="xl" align={"center"}>
            <Box pos="relative">
              <Image
                src={"/images/zunda_happy_icon.png"}
                width={60}
                height={60}
                alt="winner"
              />
            </Box>
            <Text
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              fw={900}
              style={{ fontSize: rem(40) }}
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
          <Flex gap={"md"} wrap={"wrap"} justify={"center"}>
            勝者を選択してください
          </Flex>
          <Flex gap={"md"} wrap={"wrap"} justify={"center"}>
            <Button
              onClick={() => {
                setSelectedSpeaker(data.speaker1.model);
                open();
              }}
            >
              {data.speaker1.model}
            </Button>
            <Button
              onClick={() => {
                setSelectedSpeaker(data.speaker2.model);
                open();
              }}
            >
              {data.speaker2.model}
            </Button>
          </Flex>
          <Flex gap={"md"} wrap={"wrap"} justify={"center"}>
            <LogOverlay speaker1={data.speaker1} speaker2={data.speaker2}>
              会話を見る
            </LogOverlay>
            <Link href="/">
              <Button>Topに戻る</Button>
            </Link>
            <Button onClick={() => setPhase("prepare")}>もう一度</Button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default Result;
