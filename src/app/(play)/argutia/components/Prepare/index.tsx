"use client";

import { SampleAgendas, models } from "@/constants";
import { Box, Button, Container, Flex, Input, NativeSelect, Text, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./prepare.module.css";

type Props = {
	setPhase: Dispatch<SetStateAction<Phase>>;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
};

type SubmitData = { [P in "agenda" | "speaker1" | "speaker2"]: ArgutiaData[P] };

const fetcher = async (url: string, title: string, positionA: string, positionB: string) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			title: title,
			positionA: positionA,
			positionB: positionB,
		}),
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

type Response = {
	conversationId: string;
};

const Prepare: FC<Props> = ({ setPhase, setData }) => {
	const handleSubmit = async (data: SubmitData) => {
		setPhase("argutia");
		const res: Response = await fetcher(
			"/api/start",
			data.agenda,
			data.speaker1.position,
			data.speaker2.position,
		);
		setData({ ...data, conversationId: res.conversationId });
	};

	const handleAutoSelect = () => {
		const sample = SampleAgendas[Math.floor(Math.random() * SampleAgendas.length)];
		form.setValues({
			agenda: sample.agenda,
			speaker1: {
				model: form.values.speaker1.model,
				position: sample.speaker1,
				comments: [],
			},
			speaker2: {
				model: form.values.speaker2.model,
				position: sample.speaker2,
				comments: [],
			},
		});
	};

	const form = useForm<SubmitData>({
		initialValues: {
			agenda: "",
			speaker1: {
				model: "GPT-4",
				position: "",
				comments: [],
			},
			speaker2: {
				model: "GPT-4",
				position: "",
				comments: [],
			},
		},
	});
	return (
		<div className={classes.root}>
			<Container size={"lg"}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Flex justify={"center"} direction={"column"} align={"center"} gap={"md"}>
						<Title c={"var(--mantine-color-white)"} size={"h2"}>
							新しい議論を始めましょう
						</Title>
						<Box mb={"md"} w={"32rem"} maw={"100%"}>
							<Input.Wrapper label="議題" withAsterisk classNames={{ label: classes.label }}>
								<Input
									size={"lg"}
									placeholder="例: き〇この山とたけ〇この里、どちらが美味しいですか？"
									required
									{...form.getInputProps("agenda")}
								/>
							</Input.Wrapper>
						</Box>
						<Box w={"32rem"} maw={"100%"}>
							<Flex className={classes.speaker}>
								<Input.Wrapper
									label="立場"
									withAsterisk
									classNames={{ label: classes.label }}
									flex={"2"}
								>
									<Input
										size={"sm"}
										placeholder="例: きの〇の山"
										required
										{...form.getInputProps("speaker1.position")}
									/>
								</Input.Wrapper>
								<NativeSelect
									label={"使用するモデル1"}
									data={models}
									classNames={{ label: classes.label }}
									flex={"1"}
									{...form.getInputProps("speaker1.model")}
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
							<Flex className={classes.speaker}>
								<Input.Wrapper
									label="立場"
									withAsterisk
									classNames={{ label: classes.label }}
									flex={"2"}
								>
									<Input
										size={"sm"}
										placeholder="例: た〇のこの里"
										required
										{...form.getInputProps("speaker2.position")}
									/>
								</Input.Wrapper>
								<NativeSelect
									label={"使用するモデル2"}
									data={models}
									classNames={{ label: classes.label }}
									flex={"1"}
									{...form.getInputProps("speaker2.model")}
								/>
							</Flex>
						</Box>
						<Flex gap={"md"}>
							<Button onClick={handleAutoSelect}>おまかせ</Button>
							<Button type="submit">作成する</Button>
						</Flex>
					</Flex>
				</form>
			</Container>
		</div>
	);
};

export default Prepare;
