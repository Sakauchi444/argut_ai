"use client";

import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
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
	const [opened, { toggle }] = useDisclosure(false);

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
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
				</div>
			</Container>
		</header>
	);
}
