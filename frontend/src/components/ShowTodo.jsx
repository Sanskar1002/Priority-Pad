import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";

const ShowTodo = ({todoList,setTodoList}) => {
  
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(
          "https://priority-pad-backend.onrender.com/api/v1/todo/showAllTodos",
          { withCredentials: true }
        );
        if(res.data.success)
        {
            setTodoList(res.data.todoList)
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo()
  },[]);
  return (
    <div className="flex flex-wrap items-center justify-center bg-[#48A6A7] px-8 max-lg:py-3 gap-5 ">
      {todoList.map((todo) => (
        <TodoCard key={todo._id} todo={todo} todoList={todoList} setTodoList={setTodoList} />
      ))}
    </div>
  );
};

export default ShowTodo;
