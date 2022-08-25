
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lots of dogs! 🐕</h1>
      <p>See photos of your favorite dogs</p>
      <form>
        <input type="text" name="breed" placeholder="Enter a dog breed"/>
        <button type="submit">Fetch</button>
      </form>
    </div>
  );
}

export default App;
