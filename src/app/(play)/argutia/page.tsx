'use client'

import React from 'react'
import classes from "./page.module.css";
import { Button, Container, Flex, Input, NativeSelect, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

const MODELS = ["GPT-4", "Gemini", "Claude-3"]

type SubmitData = {
  theme: string,
  model1: string,
  model2: string
}

const Argutia = () => {
  const handleSubmit = (data: SubmitData) => {
    console.log(data)
  }

  const form = useForm<SubmitData>({
    initialValues: {
      theme: "",
      model1: "GPT-4",
      model2: "GPT-4",
    },
  });
  return (
    <div className={classes.root}>
      <Container size={"lg"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex justify={"center"} direction={"column"} align={"center"} gap={50}>
            <Title c={"var(--mantine-color-white)"}>
              新しい議論を始めましょう
            </Title>
            <Input.Wrapper label="議題" withAsterisk classNames={{ label: classes.label }}>
              <Input size={"xl"} placeholder='例: きのこの山とたけのこの里どっちが美味しい？' w={"50vw"} miw={"280px"} required {...form.getInputProps('theme')}/>
            </Input.Wrapper>
            <Flex gap={20} w={"50vw"} miw={"280px"}>
              <NativeSelect label={"使用するモデル1"} data={MODELS} classNames={{ label: classes.label }} {...form.getInputProps('model1')} flex={"1"} />
              <NativeSelect label={"使用するモデル2"} data={MODELS} classNames={{ label: classes.label }} {...form.getInputProps('model2')} flex={"1"} />
            </Flex>
            <Button type='submit'>
              作成する
            </Button>
          </Flex>
        </form>
      </Container>
    </div>
  )
}

export default Argutia
