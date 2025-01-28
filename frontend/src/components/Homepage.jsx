import React from "react";
import Navbar from "./Navbar";
import AddTodo from "./AddTodo";
import ShowTodo from "./ShowTodo";
import { useState } from "react";
const Homepage = () => {
  // lifting the state up
  const [todoList, setTodoList] = useState([]);
  return (
    <div className="h-screen bg-[#e7e5d5] flex flex-col">
      <Navbar />
      <AddTodo todoList={todoList} setTodoList={setTodoList}/>
      <ShowTodo todoList={todoList} setTodoList={setTodoList}/>
    </div>
  );
};

export default Homepage;
