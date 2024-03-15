export const models = ["GPT-4", "Gemini", "Claude-3"];

export const LoadingPhrases = [
	"AIがストレッチをしています...",
	"AIがデジタル脳のウォームアップ中...",
	"AIが知識の海を潜っています...",
	"AIが情報の宇宙を旅しています...",
	"AIがデータの山を登っています...",
	"AIがコードの迷路を解いています...",
	"AIが思考回路をチューニング中...",
	"AIがクリエイティビティのスパークを探しています...",
	"AIが未来の予測を計算中...",
	"AIが賢さのレベルをアップグレードしています...",
	"AIが会話エンジンを暖めています...",
	"AIが知識の花を咲かせています...",
	"AIが創造性の翼を広げています...",
	"AIが質問に答える魔法をかけています...",
	"AIがインスピレーションの光を集めています...",
];

export const Phases: ArgutiaPhase[] = [
	"initialize",
	"speaker1-arguments",
	"speaker2-cross-examination",
	"speaker2-arguments",
	"speaker1-cross-examination",
	"speaker1-rebuttal",
	"speaker2-rebuttal",
	"speaker1-closing-arguments",
	"speaker2-closing-arguments",
	"end",
	"waiting",
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
	waiting: "待機中",
};