import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from 'react-icons/bs'; // Import the icons

const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }

    return (
        <div className='home' >
            <h1 className='heading'>Todo-List</h1>
            <Create />
            <div className='list'>
            {
                todos.length === 0
                    ?
                    <div><h2>No Record</h2></div>
                    :
                    todos.map(todo => (
                        <div className='task'  onClick={() => handleEdit(todo._id)}>
                            <div className="checkbox">
                                {todo.done ? <BsFillCheckCircleFill className='icons'></BsFillCheckCircleFill>
                                    :
                                    <BsCircleFill className='icons' />}
                                <p className={todo.done?"line_through":""}>{todo.task}</p>
                            </div>
                            <div>
                                <span>
                                    <BsFillTrashFill className='icons' onClick={()=>handleDelete(todo._id)}/>
                                </span>
                            </div>
                        </div>
                    ))
            }
            </div>
        </div>

    )
}

export default Home
