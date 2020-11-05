
import { useState } from 'react';
import './App.scss';
import Form from './components/Form';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const key = "q8pGKlT0Khz6viOf9A5MXa-3XvXETz3f8xNcchKr9MY";

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${searchValue}`)
    .then(resp => resp.json()
    .then(data => setPhotos(data.results)))
  }

  return (
    <div>
      <Form 
        searchValue={searchValue} 
        handleSearchValueChange={setSearchValue}
        handleSubmit={handleSubmit}
      />
      <section className='container'>
        <div className='row' style={{"flexWrap": "wrap"}}>
          {photos &&
            photos.map(photo =>
              <img style={{"width": "300px", "height": "250px"}} key={photo.id} src={photo.urls.full} alt='' />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
