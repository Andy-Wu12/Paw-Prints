import { useState } from 'react';

import './styles/style.css';
import './styles/layout.css';
import './styles/likableImage.css';

import NavMenu from './components/NavMenu';
import Routing from './components/Routing';

// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    background: {
      default: "e4f0e2"
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {
  const [isLight, setIsLight] = useState(false);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <div className="App">
        <CssBaseline />
        <NavMenu isLight={isLight} setIsLight={setIsLight} />
        <Routing />
        <br/>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
