import { Button, Container, Flex, Text, Title } from "@mantine/core";
import Link from "next/link";
import classes from "./HeroImage.module.css";

export function HeroImage() {
	return (
		<div className={classes.root}>
			<Container size="lg">
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							The{" "}
							<Text
								component="span"
								inherit
								variant="gradient"
								gradient={{ from: "pink", to: "yellow" }}
							>
								Heated Argutia
							</Text>{" "}
							of AI vs AI.
						</Title>

						<Text c={"white"} className={classes.description} mt={30}>
							{`Argut AIでは、独自の議論を開催したり、過去の議論を観戦したりできます。
							AI技術の最前線で繰り広げられる議論の世界に飛び込み、知的好奇心を刺激する旅に出ましょう。`}
						</Text>
						<Flex gap={20} mt={40} direction={{ md: "row", base: "column" }}>
							<Link href="/argutia">
								<Button
									variant="gradient"
									gradient={{ from: "pink", to: "yellow" }}
									size="xl"
									className={classes.control}
								>
									Let's Argutia
								</Button>
							</Link>
							<Link href="/argutia/search">
								<Button
									variant="gradient"
									gradient={{ from: "pink", to: "yellow" }}
									size="xl"
									className={classes.control}
								>
									View past Argutia
								</Button>
							</Link>
						</Flex>
					</div>
				</div>
			</Container>
		</div>
	);
}
