import { useState, useRef, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'

function App() {

  const btn_up = useRef()

  const [todo, setTodo] = useState("")
  // const [todos, setTodos] = useState([]) // this line is wrong, because when you refresh the page, the todos will be empty. and you have to add the todos again. so, we need to use localStorage to store the todos.
  //Because your todos state is initially [], the app renders with an empty list before your useEffect runs — this might make things seem like it's not working.

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [showcompleted, setShowcompleted] = useState(false) //u can change this to false, if you want to show only incomplete todos by default.

  // const saveTodos = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // } //// this function not working because setTodos is asynchronous, You're calling saveTodos() right after updating state, which may write the outdated todos array. So, Let React do the saving whenever todos changes — that’s the most React-friendly and bulletproof way


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    // console.log('todo added')
    if (!todo.trim()) return; // Validate empty input
    const newTodos = [...todos, { todo, isComplete: false, index: uuidv4() }];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Save immediately

    setTodo("")
    btn_up.current.innerText = "Add";
    // saveTodos() 
    // console.log(todos)

  }

  const handleEdit = (e, id) => {
    // console.log('todo edited')
    // console.log(id)
    let index = todos.findIndex((item) => {
      return item.index === id;
    })
    let newTodos = [...todos];
    setTodo(newTodos[index].todo);
    btn_up.current.innerText = "Update";
    setTodos(todos.filter((item) => {
      return item.index != id
    })
    )
    // saveTodos()
  }

  const handleDelete = (e, id, serial) => {
    // console.log('todo deleted')
    // console.log(id)
    if (confirm(`Are you sure, you want to delete Todo ${serial}?`)) {
      let newTodos = todos.filter((item) => {
        return item.index != id
      })
      setTodos(newTodos)
    }
    // let index= todos.findIndex((item)=>{
    //   return item.index === id
    // })
    // alert(`Todo ${index+1} deleted`)
    // saveTodos()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // let completed= todos.filter((item)=> item.index === id)
    let index = todos.findIndex((item) => {
      return item.index === id
    }) //findIndex takes a function that returns according to the condition.
    // console.log(index) //returns the index of the object/json

    // let newTodos= todos // the reason why this line is wrong, because I use the same reference of todos, so when I am changing it, it is not re-rendering the component. and the css is not applied.

    let newTodos = [...todos] // this line is correct, because I am creating a new reference of todos, so when I am changing it, it is re-rendering the component. and the css is applied.
    // console.log(newTodos[index])
    newTodos[index].isComplete = !newTodos[index].isComplete
    // console.log(newTodos[index])
    setTodos(newTodos)
    // console.log(todos)
    // saveTodos()
  }

  const handleShowcompleted = () => {
    setShowcompleted(!showcompleted)
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl backdrop-blur-md bg-white/30 rounded-[2rem] md:p-10 shadow-[0_0_20px_rgba(0,0,0,0.1)] p-4">
          <div className="title text-center text-2xl font-bold mb-6">To-do List with React</div>
          <div className="content flex justify-between gap-4">
            <input
              name=""
              id="" type='text' onChange={handleChange} value={todo} placeholder='Write your Todo here...'
              className='bg-blue-300 rounded-xl w-full resize-none h-[42px] p-3'
            /> <button className="bg-blue-400 w-[120px] cursor-pointer rounded-xl text-white font-bold hover:bg-blue-900 active:bg-blue-400 transition-all" onClick={handleAdd} ref={btn_up}>Add</button>
          </div>
          <div className="todos p-3 mt-3 flex flex-col gap-2">
            <div className="todo-head flex justify-between">
              <div className="todo-head font-bold">My Todos:</div>
              <div className="showcomplete">
                <input type="checkbox" name="showcompleted" id="" checked={showcompleted} onChange={handleShowcompleted} /> Show Completed
              </div>
            </div>
            {todos.length === 0 && <div className="">No Todos are added. Create new by clicking Add button.</div>}
            {todos.map((item, idx) => {
              return (showcompleted || !item.isComplete) && <div className="todo flex justify-between items-start gap-3" key={item.index}>
                <input type="checkbox" checked={item.isComplete && true} className='items-start mt-[6px]' name={item.index} onChange={handleCheckbox} />
                <div className={`content w-full ${item.isComplete ? "line-through" : ""}`}>{item.todo}</div>
                <div className="edit cursor-pointer"><FaRegEdit onClick={e => handleEdit(e, item.index)} /></div>
                <div className="delete cursor-pointer"><RiDeleteBinLine onClick={(e) => handleDelete(e, item.index, idx + 1)} /></ div>
              </div>

            })/* checking all todos one by one, if isComplete=True, and showComplete already false, then both false, means that one disappear, if isComplete=False, and showComplete already set false, then only isComplete=False todos are appearing.  */}
            {/* <h1>Available Todos</h1> */}

          </div>
        </div>
        <input type="text" />
      </div>
    </>
  )
}

export default App
