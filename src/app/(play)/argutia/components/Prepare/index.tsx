"use client";

import { Button, Container, Flex, Input, NativeSelect, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./prepare.module.css";

const MODELS = ["GPT-4", "Gemini", "Claude-3"];

type SubmitData = {
	agenda: string;
	model1: string;
	model2: string;
};

type Props = {
	setPhase: Dispatch<SetStateAction<Phase>>;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
};

const Prepare: FC<Props> = ({ setPhase, setData }) => {
	const handleSubmit = (data: SubmitData) => {
		setData({ ...data, A_comments: [], B_comments: [] });
		setPhase("argutia");
		// TODO: ここでデータを送信する
		console.log(data);
		// TODO: 復元の開始フラグを立てる
	};

	const form = useForm<SubmitData>({
		initialValues: {
			agenda: "",
			model1: "GPT-4",
			model2: "GPT-4",
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
								placeholder="例: きのこの山とたけのこの里、どちらが美味しいですか？"
								w={"50vw"}
								miw={"280px"}
								required
								{...form.getInputProps("agenda")}
							/>
						</Input.Wrapper>
						<Flex gap={20} w={"50vw"} miw={"280px"}>
							<NativeSelect
								label={"使用するモデル1"}
								data={MODELS}
								classNames={{ label: classes.label }}
								flex={"1"}
								{...form.getInputProps("model1")}
							/>
							<NativeSelect
								label={"使用するモデル2"}
								data={MODELS}
								classNames={{ label: classes.label }}
								flex={"1"}
								{...form.getInputProps("model2")}
							/>
						</Flex>
						<Button type="submit">作成する</Button>
					</Flex>
				</form>
			</Container>
		</div>
	);
};

export default Prepare;
