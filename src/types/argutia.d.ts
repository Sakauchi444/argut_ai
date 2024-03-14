type Phase = "prepare" | "argutia" | "result";

type ArgutiaData = {
	agenda: string;
	speaker1: Speaker;
	speaker2: Speaker;
};

type Speaker = {
	model: string;
	position: string;
	comments: string[];
};

type ArgutiaPhase =
	| "initialize"
	| "speaker1-arguments"
	| "speaker2-cross-examination"
	| "speaker2-arguments"
	| "speaker1-cross-examination"
	| "speaker1-rebuttal"
	| "speaker2-rebuttal"
	| "speaker1-closing-arguments"
	| "speaker2-closing-arguments"
	| "end"
	| "waiting"; // API からのレスポンス待ち

// 立論、反対尋問、反駁、結論
type Sections = "arguments" | "cross-examination" | "rebuttal" | "closing-arguments";

type ArgutiaOption = {
	isPaused: boolean;
	playbackSpeed: number;
};
