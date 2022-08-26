import './App.css';
import React, { useEffect, useState } from 'react';

import './styles/style.css';

function App() {
  return (
    <div className="App">
      <section id='QueryBreedSection'>
        <DogQueryForm />
      </section>
      <section id='RandomImage'>
        {/* <RandomDogImage /> */}
      </section>
    </div>
  );
}

function DogQueryForm() {
  const [imageLinks, setImageLinks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const breed = e.target.breed.value.trim();
    console.log(e);
    
    if(breed !== undefined && breed.length > 0) {
      fetch(`http://localhost:3011/dog/${breed}/get-images`)
      .then(response => response.json())
      .then(data => setImageLinks(data['message']));
    }
  }

  return (
    <div className='query-form'>
      <h1>Lots of dogs! 🐕</h1>
      <p>See photos of your favorite dogs</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="breed" placeholder="Enter a dog breed"/>
        <button type="submit">Fetch</button>
      </form>
      <br/>
      <ImageList images={imageLinks} />

    </div>
  );
}


function RandomDogImage() {
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    fetch('http://localhost:3011/dog/get-random')
    .then(response => response.json())
    .then(data => setImageLink(data['message']));

  }, []);

  return (
    <div className='random-image-container'>
      <h1> Random Dog Image </h1>
      <p> See a new photo every time you reload the page! </p>
      <img className='dog-image' src={imageLink} alt='Dog' />
    </div>
  );
}

function ImageList(props) {
  const imageLinks = props.images;
  const imageList = imageLinks.map((link, i) =>
    <img key={`image${i}`} className='dog-image' src={link} alt='Dog' />
  );

  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}

export default App;
