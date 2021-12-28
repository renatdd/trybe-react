import React from 'react';
import { Provider } from './context';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Sort from './components/Sort';
import './App.css';

function App() {
  return (
    <Provider>
      <SearchBar />
      <Sort />
      <Table />
    </Provider>
  );
}

export default App;
