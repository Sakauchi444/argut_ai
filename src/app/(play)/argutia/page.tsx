"use client";

import React from "react";
import Argutia from "./components/Argutia";
import Prepare from "./components/Prepare";
import Result from "./components/Result";

const ArgutiaPage = () => {
	const [phase, setPhase] = React.useState<Phase>("prepare");
	const [data, setData] = React.useState<ArgutiaData>({
		agenda: "",
		speaker1: "GPT-4",
		speaker2: "GPT-4",
		position1: "",
		position2: "",
		speaker1_comments: [],
		speaker2_comments: [],
	});

	switch (phase) {
		case "prepare":
			return <Prepare setPhase={setPhase} setData={setData} />;
		case "argutia":
			return <Argutia setPhase={setPhase} data={data} setData={setData} />;
		case "result":
			return <Result setPhase={setPhase} data={data} />;
	}
};

export default ArgutiaPage;
