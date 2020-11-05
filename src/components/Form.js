import { useEffect, useRef } from 'react';
import './Form.scss';

function Form( {noMatch, photos, searchValue, trendingTopics, handleSearchValueChange, handleSubmit} ) {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  const handleFocus = () => {
    inputRef.current.focus();
  }

  const handleClear = () => {
    handleSearchValueChange('');
    inputRef.current.focus();
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
          {noMatch && <label for='content' className='header__form__label'>No match found!</label>}
          <input 
            type='text'
            name='content'
            className={noMatch ? 'header__form__input header__form__input--error' : 'header__form__input'}
            placeholder='Search free high-resolution photos'
            value={searchValue}
            onChange={e => handleSearchValueChange(e.target.value)}
            ref={inputRef}
            />
          {searchValue ? <i className="fas fa-times" onClick={handleClear}/> : null}
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
