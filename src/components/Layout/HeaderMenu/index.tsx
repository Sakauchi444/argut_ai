"use client";

import { Burger, Container, Drawer, Flex, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { Footer } from "../Footer";
import { Logo } from "../Logo";
import classes from "./HeaderMenu.module.css";

const links = [
	{ link: "/argutia", label: "Argutia" },
	{ link: "/how_to_play", label: "How to Play" },
	{
		link: "/argutia/search",
		label: "Past Argutia",
	},
];

export function HeaderMenu() {
	const [opened, { toggle, close }] = useDisclosure(false);

	const items = links.map((link) => (
		<Link key={link.label} href={link.link} className={classes.link}>
			{link.label}
		</Link>
	));

	return (
		<header className={classes.header}>
			<Container size="md">
				<div className={classes.inner}>
					<Logo />
					<Group gap={5} visibleFrom="sm">
						{items}
					</Group>
					<Burger
						opened={opened}
						onClick={toggle}
						size="sm"
						hiddenFrom="sm"
						style={{ zIndex: 1000 }}
					/>
				</div>
			</Container>
			<Drawer opened={opened} onClose={close} position="right" withCloseButton={false}>
				<Flex direction="column" justify={"space-between"} h="calc(100vh - 32px)">
					<Stack mt={40} h={300} bg="var(--mantine-color-body)" justify="flex-start">
						{items}
					</Stack>
					<Footer />
				</Flex>
			</Drawer>
		</header>
	);
}
