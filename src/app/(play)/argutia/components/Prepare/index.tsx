"use client";

import { SampleAgendas, bots, models } from "@/constants";
import { Box, Button, Container, Flex, Input, NativeSelect, Text, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./prepare.module.css";

type Props = {
	setPhase: Dispatch<SetStateAction<Phase>>;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
};

type SubmitData = { [P in "agenda" | "speaker1" | "speaker2"]: ArgutiaData[P] };

const fetcher = async (
	url: string,
	title: string,
	a_position_name: string,
	a_model_id: string,
	b_position_name: string,
	b_model_id: string,
) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			title: title,
			a_position_name: a_position_name,
			a_model_id: a_model_id,
			b_position_name: b_position_name,
			b_model_id: b_model_id,
		}),
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

type Response = {
	conversationId: string;
	positionA: number;
	positionB: number;
};

const Prepare: FC<Props> = ({ setPhase, setData }) => {
	const handleSubmit = async (data: SubmitData) => {
		setPhase("argutia");
		const res: Response = await fetcher(
			"/api/start",
			data.agenda,
			data.speaker1.position,
			bots[data.speaker1.model].speakerId,
			data.speaker2.position,
			bots[data.speaker2.model].speakerId,
		);
		setData({
			...data,
			conversationId: res.conversationId,
			speaker1: { ...data.speaker1, id: res.positionA },
			speaker2: { ...data.speaker2, id: res.positionB },
		});
	};

	const handleAutoSelect = () => {
		const sample = SampleAgendas[Math.floor(Math.random() * SampleAgendas.length)];
		form.setValues({
			agenda: sample.agenda,
			speaker1: {
				...form.values.speaker1,
				position: sample.speaker1,
			},
			speaker2: {
				...form.values.speaker2,
				position: sample.speaker2,
			},
		});
	};

	const form = useForm<SubmitData>({
		initialValues: {
			agenda: "",
			speaker1: {
				id: null,
				model: "GPT-4",
				position: "",
				comments: [],
			},
			speaker2: {
				id: null,
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
