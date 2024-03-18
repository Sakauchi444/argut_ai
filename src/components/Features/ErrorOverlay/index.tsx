import { Button, Center, Overlay, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import classes from "./errorOverlay.module.css";
import { useRouter } from "next/navigation";

const ErrorOverlay = () => {
	const router = useRouter();
	return (
		<Overlay zIndex={3000}>
			<Center h={"100%"} pos={"relative"} />
			<Image
				src={"/images/zunda_panic.png"}
				alt="panic"
				fill
				sizes="50vw"
				style={{ objectFit: "contain" }}
				className={classes.spin_and_shrink}
			/>
			<Title>
				ずんだもんの頭がパンクしてしまいました。もう一度お試しください。
				<Button onClick={() => router.refresh()}>Reload</Button>
			</Title>
		</Overlay>
	);
};

export default ErrorOverlay;
