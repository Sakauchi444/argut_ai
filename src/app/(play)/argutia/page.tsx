"use client";

import ErrorOverlay from "@/components/Features/ErrorOverlay";
import { useGenerativeAI } from "@/hooks/useGenerativeAi";
import { useRealtimeJudgeAI } from "@/hooks/useRealtimeJudgeAI";
import React from "react";
import Argutia from "./components/Argutia";
import Prepare from "./components/Prepare";
import Result from "./components/Result";

const ArgutiaPage = () => {
	const [phase, setPhase] = React.useState<Phase>("prepare");
	const [data, setData] = React.useState<ArgutiaData>({
		superiority: "draw",
		conversationId: "",
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
	});

	const { isError } = useGenerativeAI(data, setData);
	useRealtimeJudgeAI(data, setData);

	switch (phase) {
		case "prepare":
			return <Prepare setPhase={setPhase} setData={setData} />;
		case "argutia":
			return (
				<>
					<Argutia setPhase={setPhase} data={data} />
					{isError && <ErrorOverlay />}
				</>
			);
		case "result":
			return <Result setPhase={setPhase} data={data} setData={setData} />;
	}
};

export default ArgutiaPage;
