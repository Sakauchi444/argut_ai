type Phase = "prepare" | "argutia" | "result";

type SubmitData = {
	agenda: string;
	speaker1: string;
	speaker2: string;
	position1: string;
	position2: string;
};

type ArgutiaPhase = "initialize" | "speaker1" | "speaker2" | "waiting";

type ArgutiaOption = {
	isPaused: boolean;
	playbackSpeed: number;
};

type ArgutiaData = SubmitData & {
	speaker1_comments: string[];
	speaker2_comments: string[];
};
