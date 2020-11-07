import { useState, useEffect, useRef } from 'react';
import './Form.scss';
import data from '../db.json';

function Form( {noMatch, photos, searchValue, trendingTopics, handleSearchValueChange, handleSubmit} ) {

  const inputRef = useRef(null);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
  })

  const handleFocus = () => {
    inputRef.current.focus();
  }

  const handleClear = () => {
    handleSearchValueChange('');
    inputRef.current.focus();
    setMatches([]);
  }

  const findMatches = (wordToMatch, data) => {
    return data.filter(elem => {
      const regex = new RegExp(wordToMatch, 'gi');
      return elem.title.match(regex);
    })
  }

  const displayMatches = () => {
    handleSearchValueChange(inputRef.current.value);
    if (searchValue === '') return setMatches([]);
    const arrayOfTags = [];
    data.forEach(tags=> {
      return arrayOfTags.push(...tags.tags)
      })
    const matchArray = findMatches(searchValue, arrayOfTags);
    const uniqMatchArray = [...new Set(matchArray)];
    setMatches(uniqMatchArray);
  }

  return (
    <section className={photos.length === 0 ? 'container fullForm' : 'container smallForm'}>
      <header className='row header'>
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
          {searchValue ? <i className="fas fa-times" onClick={handleClear}/> : null}
          {!searchValue ?
            null
            :
            <ul className='header__form__list'>
              {matches.length === 0 ?
                <li className='form__list__elem'>No Match</li>
                :
                matches.map((match, idx) => {
                return <li key={idx} className='form__list__elem' onClick={e => handleSubmit(e, match.title)}>{match.title}</li>
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
