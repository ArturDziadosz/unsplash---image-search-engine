
import { useState } from 'react';
import './App.scss';
import Form from './components/Form';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(searchValue);
  }

  return (
    <div>
      <Form 
        searchValue={searchValue} 
        handleSearchValueChange={setSearchValue}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
