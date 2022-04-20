import React from 'react';
import './App.css';
import AddBlock from './components/AddBlock';
import Clock from './components/clock-components/Clock';

function App() {
  const [clocks, setClocks] = React.useState([]);

  function remove(id) {
    console.log(id);
    setClocks(clocks.filter(el => el.id !== id))
  }
  
  return (
    <div className="container">
      <AddBlock onAdd={setClocks}/>
      <div className='clocks'>
        {clocks.map(el => <Clock key={el.id} deviation={el.deviation} city={el.city} id={el.id} onRemove={remove}/>)}
      </div>
    </div>
  );
}

export default App;
