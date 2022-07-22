import React, { useState } from 'react';

function App() {
  var fn;
  const [count, setCount] = useState([]);
  var inp = document.getElementById('inp');
  const getv = (event) => {
    fn = event.target.value;
    if (event.key === 'Enter' && fn.length > 0) {
      setCount([...count, `${count.length + 1}.${fn}`]);
      inp.value = '';
    }
  }

  const update = () => {
    if (fn.length > 0) {
      setCount([...count, `${count.length + 1}.${fn}`]);
      inp.value = '';
    }
  }

  const remove = () => {
    console.log(count);
  }

  return (
    <div className="text-3xl text-center p-16 bg-zinc-900 text-white">
      <h1 className="text-8xl">To-Do List</h1><br />
      <div className="justify-center md:mx-56 ">
        {count.map(entry => <div className="flex justify-left p-2">{entry}
          <button className="ml-auto text-xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 p-1 px-3 ml-4" onClick={remove}>Done</button>
        </div>)}
      </div>
      <input type="text" id='inp' className="text-2xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 px-8 py-2 my-4" onKeyDown={getv} placeholder="Add a task" /><br />
      <button type="button" className="text-2xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 px-8 py-2" onClick={update}>CLICK</button>
    </div>
  );
}

export default App;
