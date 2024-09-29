import {useState, useEffect} from 'react'
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
   
  const [todos, setTodos] = useState([
    "Go to the gym",
    "Eat more fruits and vege",
    "Pick up the kids from school"
  ]);
  const [todoValue, setTodoValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(0)

  const persistData  = (newList) => {
    localStorage.setItem('todos', JSON.stringify({ todos: newList}))
  }
  
  const handleAddTodos = (newTodo) => {
    if (isEditing && newTodo.trim() !== ""){
      const newTodoList = [...todos];
      newTodoList[index] = newTodo;
      setTodos(newTodoList);
      setIsEditing(false);
      persistData(newTodoList)

    } else if (newTodo.trim() !== ""){
      const newTodoList = [...todos, newTodo];
      setTodos(newTodoList);
      persistData(newTodoList)
    }
       
  }

  const handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((_, todoIndex) => {
      return todoIndex !== index
    });
    setTodos(newTodoList);  
    persistData(newTodoList)     
  }

  const handleEditTodo = (index) => {
    const EditingTodo = todos[index];
    setTodoValue(EditingTodo)

    const EditingTodoIndex = index;
    setIndex(EditingTodoIndex);

    const Editing = true;
    setIsEditing(Editing);
    
  }

  useEffect(() => {
    
    const localTodos = localStorage.getItem("todos");

    if (localTodos) {
        const parsedTodos = JSON.parse(localTodos).todos;
        setTodos(parsedTodos) 
    }

  }, [])

  return (
    <>
      <TodoInput todoValue = {todoValue}
                 setTodoValue = {setTodoValue}
                 handleAddTodos = {handleAddTodos}
                 isEditing = {isEditing} />
      <TodoList todos = {todos}
                handleDeleteTodo = {handleDeleteTodo}
                handleEditTodo = {handleEditTodo}
     />  
    </>
  )
}

export default App
