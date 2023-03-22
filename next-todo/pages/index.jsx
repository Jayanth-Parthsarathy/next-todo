import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useEffect, useState } from "react";
const BASE_URL = 'http://localhost:8001/';
export default function Home() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(()=>{
    getTodos();
  }, [])

  const getTodos = ()=>{
    fetch(BASE_URL)
    .then(res=>res.json())
    .then(data=>setTodos(data))
    .catch(err=>console.error(err))
  }

  const completeTodo = async(id)=>{
    const data = await fetch(BASE_URL + "complete/" + id)
    .then(res=>res.json())
    setTodos(todos=>todos.map(todo=>{
      if(todo._id === data._id){
        todo.completed = data.completed
      }
      return todo 
    }))
  }

  const deleteTodo = async(id)=>{
    const data = await fetch(BASE_URL + id, {
      method:'DELETE'
    }).then((res)=>res.json())

    setTodos(todos=>todos.filter(todo=>todo._id!==data._id))
  }

  const addTodo = async()=>{
    const data = await fetch(BASE_URL, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body :JSON.stringify({text:newTodo})
    }).then(res=>res.json())
    setTodos([...todos, data])
    setNewTodo("")
  }

  return (
    <div className= "overflow-hidden text-white mx-7 flex-col justify-center items-center">
      <div className="text-4xl my-4">Welcome, Jayanth</div>
      <div className="text-gray-500 my-5">Your Tasks</div>
      <div className="flex-col w-screen items-center justify-center">
        {todos.map((todo)=>(
          <div  className={`w-1/4 todo flex justify-around content-center bg-gray-900 p-2 my-2`}  key={todo._id}>
            <div className={`decoration rounded-full w-5 h-5 self-start bg-gray-300 ${todo.completed?'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600': ''}`}></div>
            <div onClick={()=>completeTodo(todo._id)}className={`${todo.completed?'line-through completed': ''}`}>{todo.text}</div>
            <div onClick={()=>deleteTodo(todo._id)} className="rounded-full w-5 h-5  bg-red-500 text-center leading-4 p-0.5">x</div>
          </div>
        ))}
      </div>
        <div className="input flex-col p-3 my-6">
          <h3 className="my-2 text-xl" >Add New Todo</h3>
          <label className="my-2" htmlFor="text-input"></label>
          <input className="my-2 text-black text-center rounded-md bg-gray-300 border-none" id="text-input" type="text" onChange={e=>setNewTodo(e.target.value)} value={newTodo} />
          <div className="button my-2 bg-gray-700 w-1/12 rounded-md text-center p-0.7" onClick={addTodo}>Create task</div>
        </div>
    </div>
  )
}
