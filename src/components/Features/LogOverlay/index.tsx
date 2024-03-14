import { Container, Flex, Overlay, Paper, Stack, Text } from "@mantine/core";
import React, { FC } from "react";
import classes from "./LogOverlay.module.css";
import Image from "next/image";

type Props = {
	speaker1: Speaker;
	speaker2: Speaker;
};

const LogOverlay: FC<Props> = ({ speaker1, speaker2 }) => {
	return (
    <Overlay>
      <Container size={"lg"} p={"xl"} className={classes.container}>
        <Stack className={classes.stack}>
          {speaker1.comments.map((comment, index) => (
            <>
              <Paper key={comment}>
                <Flex gap={"md"} p="md">
                  <Image src={"/images/zunda_icon.png"} alt={`${speaker1.position} icon`} height={50} width={50} />
                  <Text c={"black"}>{comment}</Text>
                </Flex>
              </Paper>
              {/* Speaker2のログ */}
              {speaker2.comments[index] && (
                <Paper key={speaker2.comments[index]}>
                  <Flex gap={"md"} p="md">
                    <Image src={"/images/zunda_icon.png"} alt={`${speaker1.position} icon`} height={50} width={50} />
                    <Text c={"black"}>{speaker2.comments[index]}</Text>
                  </Flex>
                </Paper>
              )}
            </>
          ))}
        </Stack>
      </Container>
    </Overlay>
  );
};

export default LogOverlay;
