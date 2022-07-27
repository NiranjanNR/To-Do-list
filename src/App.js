import React, { useState,useEffect } from 'react';
import { db } from './firebase-config';
import { collection,getDocs,addDoc,deleteDoc,doc } from 'firebase/firestore';
import './index.css';
var i = 2;
function App() {

  const listCollectionRef = collection(db , "List");

  // DataBase
  const deleteTask = async (index,id) =>{
    console.log(index,id);
    const userDoc =doc(db, "List", id);
    await deleteDoc(userDoc);
    del(index);
  }

  const createTask = async () => {
    await addDoc(listCollectionRef, { Task:value ,Status:false})
  }
  const getList = async () =>{
    const dat = await getDocs(listCollectionRef);
    setCount(dat.docs.map((doc)=>({...doc.data(),id:doc.id})))
  }
  useEffect(() =>{
    const getList = async () =>{
      const dat = await getDocs(listCollectionRef);
      setCount(dat.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getList();
  },[])
  //DataBase over

  //Front-End
  var fn;
  const [value,setValue] = useState("");
  const [count, setCount] = useState([
    {},
  ]);

  function Change(event) {
    fn = event.target.value;
    if (event.key === 'Enter' && fn.length > 0) {
      var sm = [...count, { Task:value , index: i }];
      i = i + 1;
      setCount(sm);
      createTask();
      setValue("");
      getList();
    }
  }

  const Click = e => {
    e.preventDefault();
    if (value.length !== 0) {
      i = i + 1;
      var sm = [...count, { Task: value, index: i }];
      console.log(count);
      setCount(sm);
      createTask();
      setValue("");
      console.log(process.env.REACT_APP_API_KEY);
      getList();
    }
  };

  function del(index){

    const nwTsk = [...count];
    nwTsk.splice(index, 1);
    setCount(nwTsk);

  }

  return (
    <div className="text-3xl text-center md:p-12 ">
    <h1 className="md:text-8xl text-7xl	text-neutral-800 ">To-Do List</h1><br />
    <div className="md:flex md:mx-10 md:my-12 mx-10 hmm">
      <div>
        <h1 className="text-neutral-900 md:text-left text-5xl md:mt-20 lg:text-7xl mb-7 my-3">Write the tasks<br /> you have left to complete</h1>
      </div>
      <div className="blur-me rounded-3xl p-10 text-2xl lg:mx-20 ">
      {count.map((iterate,index) => 
        <div className="flex">{true ? <div className="p-2">{index+1}.</div> :<></>}
        <div className="ml-2 p-2">{iterate.Task}</div>
        {true ? <button className="ml-auto text-xl text-white rounded-lg bg-neutral-700/50 hover:bg-neutral-700/75 p-1 px-3 my-2" onClick={() => deleteTask(index,iterate.id)}>Delete</button> :<></>}
      </div>)}
      <input  type="text" className="text-center text-xl sm:text-2xl text-black/75 border-2 border-black placeholder:text-black/75 bg-transparent rounded-lg my-4 py-1 md:px-6 md:py-2" value={value} onChange={e => setValue(e.target.value)} onKeyDown={Change} placeholder="Add a task" /><br />
      <button className="text-xl text-white/75 bg-neutral-700/50 hover:bg-neutral-700/75 rounded-lg p-1 px-4 " onClick={Click} >Add</button>
      </div>
    </div>
    </div>
  );
}

export default App;
