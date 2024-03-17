import { ActionIcon, Container, Group, rem } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Logo } from "../Logo";
import classes from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				<Logo />
				<Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
					<a href="https://github.com/Sakauchi444/argut_ai" about="_blank">
						<ActionIcon size="lg" variant="subtle">
							<IconBrandGithub
								style={{ width: rem(18), height: rem(18), color: "gray" }}
								stroke={1.5}
							/>
						</ActionIcon>
					</a>
				</Group>
			</Container>
		</footer>
	);
}
