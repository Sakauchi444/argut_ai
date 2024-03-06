import { Flex, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
	return (
		<Link
			href={"/"}
			style={{
				textDecoration: "none",
				color: "var(--mantine-color-text)",
			}}
		>
			<Flex direction={"row"} gap={3}>
				<Image
					src={"/images/logo.png"}
					alt={"logo"}
					width={30}
					height={30}
					style={{ borderRadius: "5px" }}
				/>
				<Title size="h3">Arugt AI</Title>
			</Flex>
		</Link>
	);
};
