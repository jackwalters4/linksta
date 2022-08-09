import './App.css';
import { useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';

function App() {

  const [categoryMap, setCategoryMap] = useState(null);
  const [categories, setCategories] = useState(null);

  return (
    <div className='background'>
      <Header categories={categories} setCategories={setCategories} categoryMap={categoryMap} setCategoryMap={setCategoryMap}/>
      <Dashboard categories={categories} setCategories={setCategories} categoryMap={categoryMap} setCategoryMap={setCategoryMap}/>
    </div>
  );
}

export default App;
