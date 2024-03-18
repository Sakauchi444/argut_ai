export const models = ["GPT-3.5", "GPT-4", "Claude-2", "Claude-3-Opus", "Claude-3-Sonnet"];

export const bots: Record<Model, Bot> = {
	"GPT-3.5": { bot: "gpt3_5", speakerId: "1" },
	"GPT-4": { bot: "beaver", speakerId: "2" },
	"Claude-2": { bot: "claude_2_short", speakerId: "3" },
	"Claude-3-Opus": { bot: "claude_2_1_cedar", speakerId: "4" },
	"Claude-3-Sonnet": { bot: "claude_2_1_bamboo", speakerId: "5" },
};

export const LoadingPhrases = [
	"ずんだもんがストレッチをしています...",
	"ずんだもんがウォームアップ中...",
	"ずんだもんが未来を予測中...",
	"ずんだもんが必死に考えています...",
	"ずんだもんは考えるのをやめた！",
	"ずんだもんは混乱している！",
	"ずんだもんは賢さのレベルがあがった!",
	"ずんだもんは頭を抱えている...",
	"ずんだもんは何かを探しています...",
];

export const Phases: ArgutiaPhase[] = [
	"initialize",
	"speaker1-arguments",
	"speaker2-cross-examination",
	"speaker2-arguments",
	"speaker1-cross-examination",
	"speaker2-rebuttal",
	"speaker1-rebuttal",
	"speaker2-closing-arguments",
	"speaker1-closing-arguments",
	"end",
];

export const PhaseTitles: Record<ArgutiaPhase, string> = {
	initialize: "初期化中",
	"speaker1-arguments": "立論",
	"speaker2-cross-examination": "反対尋問",
	"speaker2-arguments": "立論",
	"speaker1-cross-examination": "反対尋問",
	"speaker1-rebuttal": "反駁",
	"speaker2-rebuttal": "反駁",
	"speaker1-closing-arguments": "結論",
	"speaker2-closing-arguments": "結論",
	end: "終了",
};

export const SampleAgendas = [
	{
		agenda: "きのこの山とたけのこの里、どちらが美味しいですか？",
		speaker1: "きのこの山",
		speaker2: "たけのこの里",
	},
	{
		agenda: "犬と猫、どちらが飼いやすいか？",
		speaker1: "犬",
		speaker2: "猫",
	},
	{
		agenda: "安楽死は合法化すべきか？",
		speaker1: "賛成",
		speaker2: "反対",
	},
	{
		agenda: "AIは人間を超えることができるか？",
		speaker1: "可能",
		speaker2: "不可能",
	},
	{
		agenda: "宇宙人は存在するか？",
		speaker1: "存在する",
		speaker2: "存在しない",
	},
	{
		agenda: "バナナはおやつに含むか",
		speaker1: "含む",
		speaker2: "含まない",
	},
	{
		agenda: "親ガチャは存在するか",
		speaker1: "存在する",
		speaker2: "存在しない",
	},
	{
		agenda: "救急車は有料化すべき",
		speaker1: "賛成",
		speaker2: "反対",
	},
	{
		agenda: "死刑制度は廃止すべき",
		speaker1: "賛成",
		speaker2: "反対",
	},
	{
		agenda: "仕事は給与とやりがいのどちらが大切か",
		speaker1: "給与",
		speaker2: "やりがい",
	},
];
