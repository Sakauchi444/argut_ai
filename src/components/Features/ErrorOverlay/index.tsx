import { Center, Overlay } from "@mantine/core";
import Image from "next/image";
import React from "react";

const ErrorOverlay = () => {
	return (
		<Overlay zIndex={3000}>
			<Center h={"100%"} pos={"relative"} />
			<Image src={"/images/zunda_panic.png"} alt="panic" fill sizes="50vw" />
		</Overlay>
	);
};

export default ErrorOverlay;
