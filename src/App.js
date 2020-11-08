
import { useEffect, useState } from 'react';
import './App.scss';
import Form from './components/Form';
import PhotoGallery from './components/PhotoGallery';

function App() {

  //state
  const [searchValue, setSearchValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [page, setPage] = useState(1);
  const [isBottom, setIsBottom] = useState(false);

  //variables
  const key = "q8pGKlT0Khz6viOf9A5MXa-3XvXETz3f8xNcchKr9MY";

  // fetching background image and top trending topics on component mounting
  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random/?client_id=${key}`)
    .then(resp => resp.json()
    .then(data => setBackgroundImg(data.urls.regular)))

    fetch(`https://api.unsplash.com/topics/?client_id=${key}&per_page=5`)
    .then(resp => resp.json()
    .then(data => setTrendingTopics(data)))
  }, [])

  //if user is on the bottom of the page change state of page
  useEffect(() => {
    if (isBottom) {
      setPage(value => value + 1);
    }
  }, [isBottom]);

  //if state of page is changed fetch additional data
  useEffect(() => {
    if (page !== 1) {
      handleMore();
    }
  }, [page])

  //fetching data after submiting form or clicking on type ahead data
  const handleSubmit = (e, value) => {
    //if type ahead data was clicked or similar topics, they passed value
    if (value) {
      fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${value}&per_page=30`)
      .then(resp => resp.json()
      .then(data => {
        //checking if there is a match
        if (data.total === 0) {
          setNoMatch(true);
        } else {
          setNoMatch(false);
        }
        //changing state
        setSavedValue(value.charAt(0).toUpperCase() + value.slice(1));
        if (data.results) {
          setPhotos(data.results);
        }
      }))
      //if form was submited
    } else {
      e.preventDefault();
      fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${searchValue}&per_page=30`)
      .then(resp => resp.json()
      .then(data => {
        //checking if there is a match
        if (data.total === 0) {
          setNoMatch(true);
        } else {
          setNoMatch(false);
        }
        //changing state
        setSavedValue(searchValue.charAt(0).toUpperCase() + searchValue.slice(1));
        if (data.results) {
          setPhotos(data.results);
        }
      }))
    }
  }

  const handleMore = () => {
    //added page query
    fetch(`https://api.unsplash.com/search/photos/?client_id=${key}&query=${savedValue}&per_page=30&page=${page}`)
    .then(resp => resp.json()
    .then(data => {
      //checking if there is a match
      if (data.total === 0) {
        setNoMatch(true);
      } else {
        setNoMatch(false);
      }

      //adding data together
      if (data.results) {
        const photosArray = [...photos, ...data.results];
        setPhotos(photosArray);
      }
      setIsBottom(false);
    }))
  }

  return (
    <>
      {/* first screen before any submit and fetch */}
      {photos.length === 0 && <section className="hero" style={backgroundImg ? {"backgroundImage": `url(${backgroundImg})`} : null} />}
      <Form 
        noMatch={noMatch}
        photos={photos}
        searchValue={searchValue} 
        trendingTopics={trendingTopics}
        handleSearchValueChange={setSearchValue}
        handleSubmit={handleSubmit}
      />
      {/* second screen with gallery */}
      {photos.length !==0 && 
        <PhotoGallery 
          photos={photos}
          savedValue={savedValue}
          handleClickTag={handleSubmit}
          setIsBottom={setIsBottom}
        />
      }
    </>
  );
}

export default App;
