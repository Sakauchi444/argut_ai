import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";

const theme = createTheme({});

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default Providers;
