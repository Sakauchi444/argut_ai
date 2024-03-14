"use client";

import { models } from "@/constants";
import { Button, Container, Flex, Input, NativeSelect, Text, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Dispatch, FC, SetStateAction } from "react";
import classes from "./prepare.module.css";

type Props = {
	setPhase: Dispatch<SetStateAction<Phase>>;
	setData: Dispatch<SetStateAction<ArgutiaData>>;
};

const Prepare: FC<Props> = ({ setPhase, setData }) => {
	const handleSubmit = (data: ArgutiaData) => {
		setData({ ...data });
		setPhase("argutia");
		// TODO: ここでデータを送信する
		console.log(data);
		// TODO: 復元の開始フラグを立てる
	};

	const form = useForm<ArgutiaData>({
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
						<Flex gap={20} w={"50vw"} miw={"280px"}>
							<Input.Wrapper label="立場" withAsterisk classNames={{ label: classes.label }}>
								<Input
									size={"sm"}
									w={"30vw"}
									miw={"200px"}
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
						<Button type="submit" variant="gradient" gradient={{ from: "pink", to: "yellow" }}>
							作成する
						</Button>
					</Flex>
				</form>
			</Container>
		</div>
	);
};

export default Prepare;
