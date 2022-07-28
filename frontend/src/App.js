import './App.css';
import { useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';

function App() {

  const [categoryMap, setCategoryMap] = useState(null);

  return (
    <div className='background'>
      <Header categoryMap={categoryMap} setCategoryMap={setCategoryMap}/>
      <Dashboard categoryMap={categoryMap} setCategoryMap={setCategoryMap}/>
    </div>
  );
}

export default App;
