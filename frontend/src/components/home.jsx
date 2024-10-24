import React, { useEffect, useState } from "react"
import axios from "axios"
import { createTodo } from "../../../backend/controller/todo.controller"

function Home() {

    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newTodo, setNewTodos] = useState("")

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:4001/todo/fetch", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log(response.data.todos)
                setTodos(response.data.todos)
                setError(null)
            } catch (error) {
                setError("Failed to fetch todos")
            } finally {
                setLoading(false)
            }
        }
        fetchTodos()
    }, [])

    const todoCreate = async () => {
        if (!newTodo) return
        try {
            const response = await axios.post("http://localhost:4001/todo/create", {
                text: newTodo,
                completed: false
            },
                { withCredentials: true })
            console.log(response.data.newTodo)
            setTodos([...todos, response.data.newTodo])
        } catch (error) {
            setError("Failed to create todo")
        }
    }

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id);
        if (!todo) return;

        try {
            const response = await axios.put(`http://localhost:4001/todo/update/${id}`, {
                ...todo,
                completed: !todo.completed

            }, {
                withCredentials: true
            });

            console.log(response.data.todo);
            setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        } catch (error) {
            console.error(error);
            setError("Failed to update todo status");
        }
    };

    const todoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
                withCredentials: true
            })
            setTodos(todos.filter(t => t._id !== id))
        } catch (error) {
            setError("Failed to delete todo")
        }
    }

    const remainingTodos = todos.filter( (todo) => !todo.completed).length

    return (<>
        <div className="bg-sky-500 min-h-screen p-6">

            <div className="bg-gray-200 max-w-lg lg:max-w-xl rounded-lg shadow-lg flex items-center justify-center  flex-col mx-8 sm:mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
                <div className="flex mb-4  w-[80%]">
                    <input 
                    value={newTodo}
                    onChange={(e)=>{setNewTodos(e.target.value)}}
                    onKeyPress={(e) => { e.key === "Enter"  && todoCreate()}}
                    className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none" type="text" placeholder="Add new todo" />
                    <button 
                    onClick={todoCreate}
                     className="bg-purple-500 text-white rounded-r-md px-4 hover:bg-blue-600 transition"> Add</button>
                </div>
                {
                        loading? (<div className="text-center justify-center"> <span className="text-gray-600 font-semibold text-sm ">Loading...</span> </div>):error? (<div  className="text-center justify-center font-semibold text-sm text-red-600"> {error}</div>):(
                <ul className=" w-[80%] mb-4">

                    {todos.map((todo, index) => {

                        return < div key={todo._id || index} > <li className="flex  items-center justify-between p-2 bg-gray-200 ">
                            <div className="flex items-center">
                                <input type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => todoStatus(todo._id)} />
                                <span className={`text-sm px-2 ${todo.completed ? "text-green-600 font-semibold" : "text-black"}`}>
                                    {todo.text}
                                </span>


                            </div>
                            <button onClick={() => { todoDelete(todo._id) }} className="bg-gray-800 font-semibold text-white rounded-md  hover:bg-red-600 transition from-neutral-400 text-xs p-1">Delete</button>
                        </li>
                        </div>
                    })}             

                </ul>)}
                <p className="text-center text-gray-500 text-sm mb-4"> {`${remainingTodos} remaining todos`}</p>
                <button className="w-[80%] bg-purple-500 text-white rounded-md py-2 hover:bg-blue-600 transition">Logout</button>
            </div>
        </div>
    </>)
}

export default Home