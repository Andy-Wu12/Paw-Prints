import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './styles/style.css';
import './styles/layout.css';
import './styles/likableImage.css';

import { RandomDogImage } from './routes/RandomDogImage.tsx';
import QueryBreedSection from './routes/QueryBreedSection.tsx';
import Error404 from './routes/404.tsx';
import Home from './routes/Home';
import FavoriteImages from './routes/Favorites.tsx';
import NavMenu from './components/NavMenu.tsx';

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
        <Routes>
          {/* NS_BINDING_ABORTED error occurs for every image 
          received in first fetch after every page (re)load
          The same images then load successfully immediately afterward.
          NOTE: Error seems to only be occurring on Firefox */}
          <Route path="/" element={<Home />} />
            <Route path="/get-breed" element={<QueryBreedSection />} />
            <Route path="/get-random" element={<RandomDogImage />} />
            <Route path="/favorites" element={<FavoriteImages />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

        <br/>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
