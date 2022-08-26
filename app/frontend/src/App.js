import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <DogQueryForm />
      <br/>
      <RandomDogImage />
    </div>
  );
}

function DogQueryForm() {
  return (
    <div>
      <h1>Lots of dogs! 🐕</h1>
      <p>See photos of your favorite dogs</p>
      <form>
        <input type="text" name="breed" placeholder="Enter a dog breed"/>
        <button type="submit">Fetch</button>
      </form>
    </div>
  );
}

function RandomDogImage() {
  const [imageLink, setImageLink] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3011/dog/get-random')
    .then(response => response.json())
    .then(data => setImageLink(data['message']));

  }, []);

  return (
    <div>
      <h1> Random Dog Image </h1>
      <p> See a new photo every time you reload the page! </p>
      <img src={imageLink} />
    </div>
  );
}

function ImageList(props) {
  const imageLinks = props.images
  const imageList = imageLinks.map((link) =>
    <img src={link} />
  );

  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}

export default App;
