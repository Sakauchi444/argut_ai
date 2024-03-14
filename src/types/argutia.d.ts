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

type ArgutiaPhase = "initialize" | "speaker1" | "speaker2" | "waiting";

type Sections = "arguments" | "cross-examination" | "rebuttal" | "closing-arguments";

type ArgutiaOption = {
	isPaused: boolean;
	playbackSpeed: number;
};
