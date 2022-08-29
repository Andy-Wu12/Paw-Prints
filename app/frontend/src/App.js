import { Routes, Route } from 'react-router-dom';

import './styles/style.css';
import './styles/layout.css';
import { RandomDogImage } from './routes/RandomDogImage';
import { QueryBreedSection } from './routes/QueryBreedSection';

function App() {

  return (
    <div className="App">
      <Routes>
        {/* NS_BINDING_ABORTED error occurs for every image 
        received in first fetch after every page (re)load
        The same images then load successfully immediately afterward.
        NOTE: Error seems to only be occurring on Firefox */}
        <Route path="/" element={<Home />} />
        <Route path="/get-breed" element={<QueryBreedSection />} />
        <Route path="/get-random" element={<RandomDogImage />} />
        {/* <section id='RandomImage'>
          <RandomDogImage />
        </section> */}
      </Routes>
      <div className="navbar">
        <a href='/' className='home'> Home </a>
        <a href='/get-breed'> Search Breeds </a>
        <a href='/get-random'> Random Dogs </a>
      </div>
      <br/><br/>
    </div>
  );
}

function Home() {
  return (
    <h1> Welcome! Click one of the buttons below to get started. </h1>
  );
}

export default App;
