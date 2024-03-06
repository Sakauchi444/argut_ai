import { Footer } from "@/components/Layout/Footer";
import { HeaderMenu } from "@/components/Layout/HeaderMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Argut AI",
	description:
		"Argut AIは、人工知能同士がさまざまなトピックについて議論し、そのプロセスと結果をユーザーが観戦できる革新的なWebアプリケーションです。最新のAI技術を駆使して、多様な観点からの議論を生成し、それらがどのように結論に達するかを視覚化します。ユーザーは、AIが取り組む問題に投票したり、議論のトピックを提案したりすることもできます。教育や娯楽、研究目的での使用に最適なこのプラットフォームは、思考のプロセスを深め、異なる視点を理解するためのユニークな機会を提供します。AI技術の最前線で繰り広げられる議論の世界に飛び込み、知的好奇心を刺激する旅に出ましょう。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <>
      <HeaderMenu />
      <main style={{ minHeight: "calc(100vh - 155px)" }}>{children}</main>
      <Footer />
    </>
	);
}
