import React, { useState } from 'react';
var i = 1;
function App() {
  var fn;
  const [value,setValue] = useState("");
  const [count, setCount] = useState([
    {},
  ]);

  function Change(event) {
    fn = event.target.value;
    if (event.key === 'Enter' && fn.length > 0) {
      var sm = [...count, { data: fn, index: i }];
      i = i + 1;
      setCount(sm);
      setValue("");
    }
  }

  const Click = e => {
    e.preventDefault();
    if (value.length !== 0) {
      i = i + 1;
      var sm = [...count, { data: value, index: i }];
      setCount(sm);
      console.log(count);
      setValue("");
    }
  };

  function del(index){

    const nwTsk = [...count];
    nwTsk.splice(index, 1);
    setCount(nwTsk);

  }

  return (
    <div className="text-3xl text-center p-16 bg-zinc-900 text-white ">
      <h1 className="text-8xl">To-Do List</h1><br />
      <div className="lg:mx-36 ">
      {count.map((iterate,index) => 
        <div className="flex">{index !==0 ? <div className="p-2">{index}.</div> :<></>}
        <div className="ml-2 p-2">{iterate.data}</div>
        {index !==0 ? <button className="ml-auto text-xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 p-1 px-3 my-2" onClick={() => del(index)}>Delete</button> :<></>}
      </div>)}
      </div>
      <input  type="text" className="text-center text-xl sm:text-3xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 my-4 md:px-4 md:py-1" value={value} onChange={e => setValue(e.target.value)} onKeyDown={Change} placeholder="Add a task" /><br />
      <button className="text-xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 p-1 px-3 " onClick={Click} >Add</button>
    </div>
  );
}

export default App;
