import React from 'react'
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({

});

const Providers = ({ children }: Readonly<{
	children: React.ReactNode;
}>) => {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  )
}

export default Providers
