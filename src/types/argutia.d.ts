type Phase = "prepare" | "argutia" | "result";

type SubmitData = {
	agenda: string;
	model1: string;
	model2: string;
};

type ArgutiaPhase = "initialize" | "A" | "B" | "waiting";

type ArgutiaOption = {
	isPaused: boolean;
	playbackSpeed: number;
};

type ArgutiaData = {
	agenda: string;
	model1: string;
	model2: string;
	A_comments: string[];
	B_comments: string[];
};
