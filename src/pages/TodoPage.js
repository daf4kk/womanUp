import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
const TodoPage = () => {
    async function fetchTodos(){
        try{
            const {data} = await axios.get('http://localhost:5000/todos');
            setTodos(data)
        }
        catch (e){
            alert(e)
        }
    }
    async function createTodo(){
        try{
            await axios.post('http://localhost:5000/todos', newTodo);
            
        }
        catch(e){
            alert(e.response.data)
        }
        fetchTodos();
    }
    const [todos, setTodos] = useState()
    /** 'Макет' создаваемых объектов */
    const [newTodo, setNewTodo] = useState({
        id: null,
        title: '',
        content: '',
        lastDay: '',
        isOverdue: false,
        completed: false,
    });
    const changeHandler = (e) => {
        setNewTodo({
            ...newTodo,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    
    
    useEffect(() => {
        fetchTodos()
    },[])

    return (
        <div className='todos-wrapper'>
            <h1>Todos</h1>
            <div className='list todo-list'>
                {todos?.map((todo) => {
                    return (<TodoItem todo = {todo} key = {todo.id} todos = {todos} setTodos = {setTodos}/>)
                })}
            </div>
            <div className='create todo-create'>
                <h3>Create todo:</h3>
                <input name = 'title' placeholder='Enter title' onChange={changeHandler}></input>
                <input name = 'content' placeholder='Enter content' onChange={changeHandler}></input>
                <input name = 'lastDay' placeholder='Enter last day' type = 'date' onChange={changeHandler}></input>
                <button onClick={createTodo}>Create</button>
            </div>
        </div>
    );
};

export default TodoPage;