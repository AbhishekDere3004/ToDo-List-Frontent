
import './App.css';
import Todo from './components/todo';
import { useEffect, useState } from 'react';
import { baseURL } from './components/utile/constant';
import axios from 'axios';
import Popup from './components/popup';
function App() {

const [todos ,settodos]=useState([]);
const [input ,setinput]= useState('');
const [updateui , setupdateui] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [popupContent, setPopupContent] = useState({});

  useEffect(()=>{
    axios
    .get(`${baseURL}/get`)
    .then((res)=>settodos(res.data))
    .catch((err)=> console.log(err));
  },[updateui]);
  
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setupdateui((prevState)=>!prevState)
        setinput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">

      <h1 className="heading">ToDo App</h1>

      <div className="inputholder">
        <input
         value={input}
         onChange={(e)=>setinput(e.target.value)}
          type="text"
          placeholder="Add new todo ....."
        />

        <button onClick={saveToDo}  className="button">Add</button>

      </div>

      <div className='todoitems'>

      {todos.map((el) => (<Todo key={el._id} text={el.toDo} id={el._id} setupdateui={setupdateui} setPopupContent={setPopupContent} setShowPopup={setShowPopup} />))}

      </div>
      <div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setupdateui={setupdateui}
    
        />
      )}
      </div>
    </div>
  );
}

export default App;
