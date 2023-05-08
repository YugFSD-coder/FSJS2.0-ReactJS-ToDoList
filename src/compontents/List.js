import React, { useState } from 'react'
import ListItem from './ListItem';
import { useEffect } from 'react';

//For local storage to et items
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}


function List() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsIditItem] = useState(null);
  const [alertshow, setAlertShow] = useState(false);


  //Add data to local Storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items])

  const addTodo = () => {
    if (!inputData) {
      setAlertShow(true);
    } else if (inputData && !toggle) {
      setItems(
        items.map((ele) => {
          if (ele.id === isEditItem) {
            return { ...ele, name: inputData }
          }
          return ele;
        })
      )
      setToggle(true);
      setInputData('');
      setIsIditItem(null);
    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData]);
      setInputData("");
    }

  }

  //detelte single item
  const deleteItem = (index) => {
    const updatedItems = items.filter((ele) => {
      return ele.id !== index;

    });
    setItems(updatedItems);
  }

  //delete all item
  const DeleteAll = () => {
    setItems([])
  }

  // Edit all item
  const editItem = (id) => {
    let newEditItems = items.find((ele) => {
      return ele.id === id;
    })
    setToggle(false);
    setInputData(newEditItems.name);
    setIsIditItem(id);
  }
  return (
    <>
      <div className="w-full md:w-2/3 flex flex-wrap justify-center  mx-auto my-2">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Enter Task Here"
          id="name"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {
          toggle ? <button type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-4"
            onClick={addTodo}>Add Task</button> : <button type="button"
              className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 mt-4"
              onClick={addTodo}>Edit Task</button>
        }
      </div>
      {alertshow? <div class="alert alert-danger w-2/3 m-auto" role="alert">
          Please Enter the Todo Task !!!
        </div>:null}

      <div className='w-2/3 border-2 m-auto p-2 '>
       
        {
          items.map((ele, index) => {
            return <ListItem ele={ele} index={index} deleteItem={deleteItem} editItem={editItem} />
          })
        }
        <div className='flex md:justify-around flex-col md:flex-row item-around w-2/3 m-auto font-semibold border-2 p-3 rounded-md'>
          <p>You have {items.length} ToDo List</p>
          <button
            type="button"
            onClick={DeleteAll}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete All
          </button>
        </div>
      </div>
    </>
  )
}

export default List