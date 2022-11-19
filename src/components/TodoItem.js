import React, {useState, useEffect} from 'react';
import axios from 'axios';


const TodoItem = ({todo,todos,setTodos}) => {
    async function updateTodo(){
        await axios.put(`http://localhost:5000/todos/${todo.id}`, componentTodo)
    }

    async function removeTodo(){
        await axios.delete(`http://localhost:5000/todos/${todo.id}`)
    }

    const [componentTodo, setComponentTodo] = useState(todo)
    const {title,content,lastDay,isOverdue, completed} = componentTodo


    useEffect(() => {
        /** Проверяем на просрочку только в том случае, если она false. Проверяю путём конвертаций в мс  */
        if (!isOverdue){      
            const nowDate = new Date;
            if (nowDate.getTime() > Date.parse(lastDay)){ 
                setComponentTodo({...componentTodo, isOverdue: true})            
            }
        }
    },[])
    /**При каждом изменений нашего todo обновляем его и в бaзе данных*/
    useEffect(() => {
        if (componentTodo){
            updateTodo()
        }
    },[componentTodo])

    return (
        <div className={`todo ${isOverdue && !completed ? 'overdue' : ''} ${completed ? 'completed' : ''}`}>
                    <div className='info '>
                        <h1 className='title'>{title}</h1>
                        <p className='content'>{content}</p>
                        <p className='last-day'>{lastDay} - Last day</p>
                    </div>
                    <div className={`tools ${isOverdue && 'overdue-tools'} ${completed && 'completed-tools'}`}>

                        <button className='' onClick = {() => {
                            const newTitle = prompt('Change title', [title]);
                            const newContent = prompt('Change content', [content]);
                            const newLastDay = prompt('Change last day', [lastDay])
                            setComponentTodo({...componentTodo, title:newTitle, content:newContent, lastDay: newLastDay})
                        }}>Edit</button>

                        <button onClick = {() => {
                            setComponentTodo({...componentTodo, completed: !completed})
                        }}>Done</button>

                        <button onClick = {() => {
                            removeTodo();
                            setTodos(todos.filter((todo) => todo.id !== componentTodo.id))
                        }}>Delete</button>

                        <form>
                    {/**  Текст инпута с type = 'file' берёт системный язык, а для смены придётся запариваться, так что ладно*/}
                                <input type = 'file' className='file' multiple></input> 
                        </form>

                    </div>
        </div>
    );
};

export default TodoItem;