import { Overlay } from "@mantine/core";
import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
	speaker1: Speaker;
	speaker2: Speaker;
	visible: boolean;
	setVisible: SetStateAction<Dispatch<boolean>>;
};

const LogOverlay: FC<Props> = ({ speaker1, speaker2, visible, setVisible }) => {
	return <Overlay></Overlay>;
};

export default LogOverlay;
