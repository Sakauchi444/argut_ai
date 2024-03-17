type Model = "GPT-3.5" | "GPT-4" | "Llama-2" | "Claude-2" | "Claude-3";

type Phase = "prepare" | "argutia" | "result";

type ArgutiaData = {
	conversationId: string;
	agenda: string;
	speaker1: Speaker;
	speaker2: Speaker;
};

type Speaker = {
	model: string;
	position: string;
	comments: string[];
};

type ChatCodeId = {
	chatCodeId: string;
};

type SpeakerWithId = Speaker & ChatCodeId;

type ArgutiaPhase =
	| "initialize"
	| "speaker1-arguments"
	| "speaker2-cross-examination"
	| "speaker2-arguments"
	| "speaker1-cross-examination"
	| "speaker2-rebuttal"
	| "speaker1-rebuttal"
	| "speaker2-closing-arguments"
	| "speaker1-closing-arguments"
	| "end"

// 立論、反対尋問、反駁、結論
type Sections = "arguments" | "cross-examination" | "rebuttal" | "closing-arguments";

type ArgutiaOption = {
	isPaused: boolean;
	playbackSpeed: number;
};
