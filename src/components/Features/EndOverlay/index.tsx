import { Center, Overlay, Title } from "@mantine/core";
import React from "react";
import classes from "./endOverlay.module.css";

const EndOverlay = () => {
	return (
		<Overlay zIndex={3000}>
			<Center h={"100%"} className={classes.root}>
				<Title style={{ zIndex: 2 }}>終了!</Title>
			</Center>
		</Overlay>
	);
};

export default EndOverlay;
