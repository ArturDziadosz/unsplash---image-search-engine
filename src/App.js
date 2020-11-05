
import { useEffect, useState } from 'react';
import './App.scss';
import Form from './components/Form';
import PhotoGallery from './components/PhotoGallery';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const key = "q8pGKlT0Khz6viOf9A5MXa-3XvXETz3f8xNcchKr9MY";

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${searchValue}&per_page=30`)
    .then(resp => resp.json()
    .then(data => {
      if (data.total === 0) {
        setNoMatch(true);
      } else {
        setNoMatch(false);
      }
      setPhotos(data.results);
    }))
  }

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random/?client_id=${key}`)
    .then(resp => resp.json()
    .then(data => setBackgroundImg(data.urls.regular)))

    fetch(`https://api.unsplash.com/topics/?client_id=${key}&per_page=5`)
    .then(resp => resp.json()
    .then(data => setTrendingTopics(data)))
  }, [])

  return (
    <>
      {photos.length === 0 && <section className="hero" style={backgroundImg ? {"backgroundImage": `url(${backgroundImg})`} : null} />}
      <Form 
        noMatch={noMatch}
        photos={photos}
        searchValue={searchValue} 
        trendingTopics={trendingTopics}
        handleSearchValueChange={setSearchValue}
        handleSubmit={handleSubmit}
      />
      {photos.length !==0 && 
        <PhotoGallery photos={photos}/>
      }
    </>
  );
}

export default App;
