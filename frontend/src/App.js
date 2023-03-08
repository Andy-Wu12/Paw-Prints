import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './styles/style.css';
import './styles/layout.css';
import './styles/likableImage.css';

import { RandomDogImage } from './routes/RandomDogImage.tsx';
import { QueryBreedSection } from './routes/QueryBreedSection.tsx';
import Error404 from './routes/404.tsx';
import FavoriteImages from './routes/Favorites.tsx';
import NavMenu from './components/NavMenu.tsx';

// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

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

function Home() {
  return (
    <>
      <h1>View Some Dogs</h1>
      <p> 
        This website uses <Link href="https://dog.ceo/dog-api/" target="_blank" rel='noopener noreferrer'>Dog API</Link>,
        a free REST API that provides access to a large collection of open source dog pictures.
      </p>
      <GitHubIcon/> <Link href="https://github.com/Andy-Wu12/View-Some-Dogs">View on GitHub</Link>
      <h2> Click one of the buttons below to get started. </h2>
      
    </>
  );
}

export default App;
