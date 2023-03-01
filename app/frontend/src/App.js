import { Routes, Route } from 'react-router-dom';

import './styles/style.css';
import './styles/layout.css';
import { RandomDogImage } from './routes/RandomDogImage.tsx';
import { QueryBreedSection } from './routes/QueryBreedSection.tsx';
import { useEffect, useState } from 'react';
import LightModeButton from './components/LightModeButton.tsx';

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
    background: {
      default: "#222"
    },
    text: {
      primary: "#fff"
    }
  }
})

function App() {
  const [isLight, setIsLight] = useState(false);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <div className="App">
        <CssBaseline />
        <br/>
        <LightModeButton isLight={isLight} setIsLight={setIsLight} />
        <Routes>
          {/* NS_BINDING_ABORTED error occurs for every image 
          received in first fetch after every page (re)load
          The same images then load successfully immediately afterward.
          NOTE: Error seems to only be occurring on Firefox */}
          <Route path="/" element={<Home />} />
          <Route path="/get-breed" element={<QueryBreedSection />} />
          <Route path="/get-random" element={<RandomDogImage />} />
        </Routes>

        
        <div className="navbar">
          <a href='/' className='home'> Home </a>
          <a href='/get-breed'> Search Breeds </a>
          <a href='/get-random'> Random Dogs </a>
        </div>
        <br/><br/>
      </div>
    </ThemeProvider>
  );
}

function Home() {
  const [imageLink, setImageLink] = useState(null);

  useEffect(() => {
    const getRandomImage = async () => {
      try {
        const response = await fetch('http://localhost:3011/dog/get-random');
        const data = await response.json();
        if(data.status === "success") {
          setImageLink(data['message']);
        }
      } catch (e) {
        setImageLink(null);
      }
    }

    getRandomImage();

  }, []);

  return (
    <>
      <h1> Welcome! Click one of the buttons below to get started. </h1>
      <div className='homepage' style={
        {
          backgroundImage: `url(${imageLink})`, 
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          height: '80vh'
        }}>
      </div>
    </>
  );
}

export default App;
