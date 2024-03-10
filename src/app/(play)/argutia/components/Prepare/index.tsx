"use client";

import { Button, Container, Flex, Input, NativeSelect, Text, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./prepare.module.css";

const MODELS = ["GPT-4", "Gemini", "Claude-3"];

type Props = {
	setPhase: Dispatch<SetStateAction<Phase>>;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
};

const Prepare: FC<Props> = ({ setPhase, setData }) => {
	const handleSubmit = (data: SubmitData) => {
		setData({ ...data, speaker1_comments: [], speaker2_comments: [] });
		setPhase("argutia");
		// TODO: ここでデータを送信する
		console.log(data);
		// TODO: 復元の開始フラグを立てる
	};

	const form = useForm<SubmitData>({
		initialValues: {
			agenda: "",
			speaker1: "GPT-4",
			speaker2: "GPT-4",
      position1: "",
      position2: "",
		},
	});
	return (
		<div className={classes.root}>
			<Container size={"lg"}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Flex justify={"center"} direction={"column"} align={"center"} gap={50}>
						<Title c={"var(--mantine-color-white)"}>新しい議論を始めましょう</Title>
						<Input.Wrapper label="議題" withAsterisk classNames={{ label: classes.label }}>
							<Input
								size={"xl"}
								placeholder="例: き〇この山とたけ〇この里、どちらが美味しいですか？"
								w={"50vw"}
								miw={"280px"}
								required
								{...form.getInputProps("agenda")}
							/>
						</Input.Wrapper>
						<Flex gap={20} w={"50vw"} miw={"280px"}>
							<Input.Wrapper label="立場" withAsterisk classNames={{ label: classes.label }}>
								<Input
									size={"sm"}
									w={"30vw"}
									miw={"200px"}
									placeholder="例: きの〇の山"
									required
									{...form.getInputProps("position1")}
								/>
							</Input.Wrapper>
							<NativeSelect
								label={"使用するモデル1"}
								data={MODELS}
								classNames={{ label: classes.label }}
								flex={"1"}
								{...form.getInputProps("speaker1")}
							/>
						</Flex>
						<Flex justify={"center"}>
							<Text
								variant="gradient"
								gradient={{ from: "pink", to: "yellow" }}
								fw={900}
								style={{ fontSize: rem("48px") }}
							>
								VS
							</Text>
						</Flex>
						<Flex gap={20} w={"50vw"} miw={"280px"}>
							<Input.Wrapper label="立場" withAsterisk classNames={{ label: classes.label }}>
								<Input
									size={"sm"}
									w={"30vw"}
									miw={"200px"}
									placeholder="例: た〇のこの里"
									required
									{...form.getInputProps("position2")}
								/>
							</Input.Wrapper>
							<NativeSelect
								label={"使用するモデル2"}
								data={MODELS}
								classNames={{ label: classes.label }}
								flex={"1"}
								{...form.getInputProps("speaker2")}
							/>
						</Flex>
						<Button type="submit" variant="gradient" gradient={{ from: "pink", to: "yellow" }}>作成する</Button>
					</Flex>
				</form>
			</Container>
		</div>
	);
};

export default Prepare;
