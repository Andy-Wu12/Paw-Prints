
import './App.css';

function App() {
  return (
    <div className="App">
      <DogQueryForm />
    </div>
  );
}

function DogQueryForm() {
  return (
    <>
      <h1>Lots of dogs! 🐕</h1>
      <p>See photos of your favorite dogs</p>
      <form>
        <input type="text" name="breed" placeholder="Enter a dog breed"/>
        <button type="submit">Fetch</button>
      </form>
    </>
  );
}

export default App;
