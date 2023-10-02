import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Home from './components/Home';
import ScreenRecorder from './components/media';
// Supports weights 100-800
import '@fontsource-variable/sora';
// Supports weights 100-900
import '@fontsource-variable/work-sans';

const colors = {
  fonts: {
    heading: `'Work Sans Variable', sans-serif`,
    body: `'Work Sans Variable', sans-serif`,
   
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home/>
    
    </ChakraProvider>
  );
}

export default App;
