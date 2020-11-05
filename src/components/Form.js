
import './Form.scss';

function Form( {searchValue, handleSearchValueChange, handleSubmit} ) {

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
          <input 
            type='text'
            name='content'
            className='header__form__input'
            placeholder='Search free high-resolution photos'
            value={searchValue}
            onChange={e => handleSearchValueChange(e.target.value)}
            />
        </form>
        <p className='header__text'>Trending: ..., ..., ..., ...</p>
      </header>
    </section>
  );
}

export default Form;
