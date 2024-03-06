"use client";

import {
	Burger,
	Center,
	Container,
	Flex,
	Group,
	Menu,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import classes from "./HeaderMenu.module.css";

const links = [
	{ link: "/about", label: "Features" },
	{
		link: "#1",
		label: "Learn",
		links: [
			{ link: "/docs", label: "Documentation" },
			{ link: "/resources", label: "Resources" },
			{ link: "/community", label: "Community" },
			{ link: "/blog", label: "Blog" },
		],
	},
	{ link: "/about", label: "About" },
	{ link: "/pricing", label: "Pricing" },
	{
		link: "#2",
		label: "Support",
		links: [
			{ link: "/faq", label: "FAQ" },
			{ link: "/demo", label: "Book a demo" },
			{ link: "/forums", label: "Forums" },
		],
	},
];

export function HeaderMenu() {
	const [opened, { toggle }] = useDisclosure(false);

	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => (
			<Menu.Item key={item.link}>{item.label}</Menu.Item>
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
							<Title size="h4">Arugt AI</Title>
						</Flex>
					</Link>
					<Group gap={5} visibleFrom="sm">
						{items}
					</Group>
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
				</div>
			</Container>
		</header>
	);
}
