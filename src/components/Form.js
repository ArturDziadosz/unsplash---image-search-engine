import { useState, useEffect, useRef } from 'react';
import './Form.scss';
import data from '../db.json';

function Form( {noMatch, photos, searchValue, trendingTopics, handleSearchValueChange, handleSubmit} ) {

  //ref
  const inputRef = useRef(null);

  //state
  const [matches, setMatches] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  //focusing on input
  useEffect(() => {
    inputRef.current.focus();
  })

  //focus on input when user click on search icon
  const handleFocus = () => {
    inputRef.current.focus();
  }

  //clearing when user click on delete icon
  const handleClear = () => {
    inputRef.current.focus();
    handleSearchValueChange('');
    setMatches([]);
  }

  //filtering through data to find matches
  const findMatches = (wordToMatch, data) => {
    return data.filter(elem => {
      const regex = new RegExp(wordToMatch, 'gi');
      return elem.match(regex);
    })
  }

  //displaying matched topics
  const displayMatches = () => {
    //updating state
    handleSearchValueChange(inputRef.current.value);

    //if there are less then 3 letters stop
    if (searchValue.length < 3) return;

    //crate array of tags from data
    const arrayOfTags = [];
    data.forEach(tags=> {
      return arrayOfTags.push(...tags.tags.map(tag=>tag.title))
      })

    //put array of tags through findMtaches function
    const matchArray = findMatches(searchValue, arrayOfTags);

    //remove duplicates
    const uniqMatchArray = matchArray.filter((item, index) => {
      return matchArray.indexOf(item) === index;
    });
    
    //updating state
    setMatches(uniqMatchArray);
  }

  const handleToggleAutocomplete = () => {
    setShowAutocomplete(!showAutocomplete);
  }

  return (
    <section className={photos.length === 0 ? 'container fullForm' : 'container smallForm'}>
      <header className='row header' style={showAutocomplete ? {"overflowY": "visible"} : null}>
        {photos.length === 0 &&
          <>
            <h1 className='header__title'>Unsplash</h1>
            <p className='header__text'>The internet's source of {' '}
              <a  href="https://unsplash.com/" 
                  target='_blank' 
                  rel='noreferrer'> freely-usable images</a>.
            </p>
            <p className='header__text'>Powered by creators everywhere.</p>
          </> 
        }
        <form className={noMatch ? 'header__form header__form--error' : 'header__form'} onSubmit={handleSubmit}>
          <i className="fas fa-search" onClick={handleFocus} />
          {noMatch && <label htmlFor='content' className='header__form__label'>No match found!</label>}
          <input 
            type='text'
            name='content'
            className={noMatch ? 'header__form__input header__form__input--error' : 'header__form__input'}
            placeholder='Search free high-resolution photos'
            value={searchValue}
            onChange={displayMatches}
            onKeyUp={displayMatches}
            ref={inputRef}
            />
          {photos.length === 0 || !searchValue ? null : <i class={showAutocomplete ? "far fa-caret-square-up" : "far fa-caret-square-down"} onClick={handleToggleAutocomplete}></i>}
          {searchValue ? <i className="fas fa-times" onClick={handleClear}/> : null}
          {searchValue.length < 3 ?
            null
            :
            <ul className='header__form__list'>
              {matches.length === 0 ?
                <li className='form__list__elem'>No Match</li>
                :
                matches.map((match, idx) => {
                return <li key={idx} className='form__list__elem' onClick={e => handleSubmit(e, match)}>{match}</li>
                })
              }
            </ul>
          }
        </form>
        {photos.length === 0 && trendingTopics.length !== 0 &&
          <p className='header__text'>Trending: 
            {trendingTopics.map((topic, i) => {
              if (trendingTopics.length === i +1) return <span key={topic.id}> {topic.title}</span>;
              return <span key={topic.id}> {topic.title},</span>
              }
            )}
          </p>
        }
      </header>
    </section>
  );
}

export default Form;
