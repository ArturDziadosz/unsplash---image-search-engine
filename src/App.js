
import { useEffect, useState } from 'react';
import './App.scss';
import Form from './components/Form';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const key = "q8pGKlT0Khz6viOf9A5MXa-3XvXETz3f8xNcchKr9MY";

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${searchValue}&per_page=30`)
    .then(resp => resp.json()
    .then(data => setPhotos(data.results)))
  }

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random/?client_id=${key}`)
    .then(resp => resp.json()
    .then(data => setBackgroundImg(data.urls.regular)))
  }, [])

  // useEffect(() => {
    // fetch(`https://api.unsplash.com/topics/?client_id=${key}`)
    // .then(resp => resp.json()
    // .then(data => setTrendingTopics(...data)))
  // }, [])

  return (
    <>
      <section className="hero" style={backgroundImg ? {"backgroundImage": `url(${backgroundImg})`} : null} />
      <Form 
        searchValue={searchValue} 
        trendingTopics={trendingTopics}
        handleSearchValueChange={setSearchValue}
        handleSubmit={handleSubmit}
      />
      {photos.length !==0 && 
        <section className='container'>
          <div className='row' style={{"flexWrap": "wrap"}}>
            {photos &&
              photos.map(photo =>
                <img key={photo.id} src={`${photo.urls.regular}&auto=format&w=300`} alt='' />
            )}
          </div>
        </section>
      }
    </>
  );
}

export default App;
