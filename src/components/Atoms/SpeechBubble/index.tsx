import { Box } from "@mantine/core";
import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./speechBubble.module.css";

type Props = ComponentPropsWithoutRef<"div"> & {
	direction: "left" | "right";
};

const SpeechBubble: FC<Props> = ({ direction, children, ...rest }) => {
	return (
		<Box
			className={`
				${classes.speech_bubble_container}
				${classes[direction]}
			`}
			{...rest}
		>
			<Box
				w={"100%"}
				className={`
					${classes.speech_bubble} 
					${direction === "right" && classes.direction_rtl}
					${classes.scrollbar}
				`}
			>
				{children}
			</Box>
		</Box>
	);
};

export default SpeechBubble;
