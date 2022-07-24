import React, { useState,useEffect } from 'react';
import { db } from './firebase-config';
import { collection,getDocs,addDoc,deleteDoc,doc } from 'firebase/firestore';
var i = 2;
function App() {

  const [Task,setTask]= useState("");
  const listCollectionRef = collection(db , "List");

  // DataBase
  const deleteTask = async (id) =>{
    const userDoc =doc(db, "List", id);
    await deleteDoc(userDoc);
  }

  const createTask = async () => {
    console.log(Task);
    await addDoc(listCollectionRef, { Task:Task ,Status:false})
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
    setTask(fn);
    if (event.key === 'Enter' && fn.length > 0) {
      var sm = [...count, { Task: fn, index: i }];
      i = i + 1;
      setCount(sm);
      createTask();
      setValue("");
    }
  }

  const Click = e => {
    e.preventDefault();
    setTask(value);
    if (value.length !== 0) {
      i = i + 1;
      var sm = [...count, { Task: value, index: i }];
      setCount(sm);
      createTask();
      setValue("");
    }
  };

  function del(index,id){

    const nwTsk = [...count];
    nwTsk.splice(index, 1);
    deleteTask(id);
    setCount(nwTsk);

  }

  return (
    <div className="text-3xl text-center p-16 bg-zinc-900 text-white ">
      <h1 className="text-8xl">To-Do List</h1><br />
      <div className="lg:mx-36 ">
      {count.map((iterate,index) => 
        <div className="flex">{true ? <div className="p-2">{index+1}.</div> :<></>}
        <div className="ml-2 p-2">{iterate.Task}</div>
        {true ? <button className="ml-auto text-xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 p-1 px-3 my-2" onClick={() => del(index,iterate.id)}>Delete</button> :<></>}
      </div>)}
      </div>
      <input  type="text" className="text-center text-xl sm:text-3xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 my-4 md:px-4 md:py-1" value={value} onChange={e => setValue(e.target.value)} onKeyDown={Change} placeholder="Add a task" /><br />
      <button className="text-xl text-white bg-stone-500 rounded-lg hover:bg-stone-700 p-1 px-3 " onClick={Click} >Add</button>
    </div>
  );
}

export default App;
