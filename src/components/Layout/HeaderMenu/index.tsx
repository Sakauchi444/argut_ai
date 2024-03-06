"use client";

import { Burger, Center, Container, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "../Logo";
import classes from "./HeaderMenu.module.css";

const links = [
	{ link: "/argutia", label: "Argutia" },
	{ link: "/how_to_play", label: "How to Play" },
	{
		link: "#Log",
		label: "Log",
		links: [
			{ link: "/search_log", label: "Documentation" },
			{ link: "/resources", label: "Resources" },
			{ link: "/community", label: "Community" },
			{ link: "/blog", label: "Blog" },
		],
	},
	{ link: "/privacy_policy", label: "Privacy Policy" },
	{
		link: "/support",
		label: "Support",
		links: [
			{ link: "/faq", label: "FAQ" },
			{ link: "/contact", label: "Contact" },
		],
	},
];

export function HeaderMenu() {
	const [opened, { toggle }] = useDisclosure(false);

	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => (
			<Link
				href={item.link}
				key={item.link}
				style={{ textDecoration: "none", color: "var(--mantine-color-text)" }}
			>
				<Menu.Item>{item.label}</Menu.Item>
			</Link>
		));

		if (menuItems) {
			return (
				<Menu
					key={link.label}
					trigger="hover"
					transitionProps={{ exitDuration: 0 }}
					withinPortal
				>
					<Menu.Target>
						<Link href={link.link} className={classes.link}>
							<Center>
								<span className={classes.linkLabel}>{link.label}</span>
								<IconChevronDown size="0.9rem" stroke={1.5} />
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<Link key={link.label} href={link.link} className={classes.link}>
				{link.label}
			</Link>
		);
	});

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
