import Loading from "@/components/Atoms/Loading";
import { LoadingPhrases } from "@/constants";
import { Center, Overlay, Title } from "@mantine/core";
import React, { useState } from "react";
import { useScramble } from "use-scramble";

const WaitOverlay = () => {
	const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * LoadingPhrases.length));
	const { ref } = useScramble({
		text: LoadingPhrases[phraseIndex],
		speed: 0.4,
		tick: 3,
		step: 1,
		seed: 1,
		scramble: 20,
		overflow: true,
		chance: 0,
		onAnimationEnd: () => {
			setTimeout(() => {
				setPhraseIndex((prev) => {
					while (true) {
						const newIndex = Math.floor(Math.random() * LoadingPhrases.length);
						if (newIndex !== prev) {
							return newIndex;
						}
					}
				});
			}, 5000);
		},
	});

	return (
		<Overlay color="#000" backgroundOpacity={0.85} zIndex={2000}>
			<Center h={"100%"}>
				<Title ref={ref} />
				<Loading />
			</Center>
		</Overlay>
	);
};

export default WaitOverlay;
