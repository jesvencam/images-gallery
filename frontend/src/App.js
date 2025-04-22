import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const App = () => {
  const [word,setWord] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.unsplash.com/photos/random?query?${word}&client_id=${UNSPLASH_ACCESS_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data from Unsplash:', error);
      });

  }


  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />

    </div>
  );
}

export default App;
