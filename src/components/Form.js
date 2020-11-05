import { useEffect, useRef } from 'react';
import './Form.scss';

function Form( {searchValue, trendingTopics, handleSearchValueChange, handleSubmit} ) {

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
    <section className='container fullForm'>
      <header className='row header'>
        <h1 className='header__title'>Unsplash</h1>
        <p className='header__text'>
          The internet's source of <a href="https://unsplash.com/" target='_blank' rel='noreferrer'>freely-usable images</a>.
        </p>
        <p className='header__text'>
          Powered by creators everywhere.
        </p>
        <form className='header__form' onSubmit={handleSubmit}>
          <i className="fas fa-search" onClick={handleFocus} />
          <input 
            type='text'
            name='content'
            className='header__form__input'
            placeholder='Search free high-resolution photos'
            value={searchValue}
            onChange={e => handleSearchValueChange(e.target.value)}
            ref={inputRef}
            />
          {searchValue ? <i className="fas fa-times" onClick={handleClear}/> : null}
        </form>
        {trendingTopics.length !== 0 &&
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
