import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";

const theme = createTheme({
	components: {
		Button: {
			defaultProps: {
				variant: "gradient",
				gradient: { from: "pink", to: "yellow" },
				c: "var(--mantine-color-white)",
			},
		},
		ActionIcon: {
			defaultProps: {
				variant: "gradient",
				gradient: { from: "pink", to: "yellow" },
				c: "var(--mantine-color-white)",
			},
		},
	},
});

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default Providers;
