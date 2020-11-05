
import './Form.scss';

function Form( {searchValue, handleSearchValueChange, handleSubmit} ) {

  return (
    <div className='container'>
      <form className='row' onSubmit={handleSubmit}>
          <input 
            type='text'
            name='content'
            value={searchValue}
            onChange={e => handleSearchValueChange(e.target.value)}
            />
      </form>
    </div>
  );
}

export default Form;
