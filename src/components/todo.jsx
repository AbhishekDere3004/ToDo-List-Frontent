import React from 'react'
import { CiEdit } from "react-icons/ci";
import { GiCrossedBones } from "react-icons/gi";
import './todo.css'
import axios from 'axios';
import { baseURL } from './utile/constant';

const Todo = ({ text, id , setupdateui,setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setupdateui((prevState) => !prevState);
    });
  };


  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <div className='todo'>
      {text}
      <div className='icons'>
        <CiEdit className='icon' onClick={updateToDo} />
        <GiCrossedBones className='icon' onClick={deleteTodo}/>
      </div>
    </div>
  )
}

export default Todo