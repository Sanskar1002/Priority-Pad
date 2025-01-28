import axios from "axios";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

const useFetchTodo = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/todo/showAllTodos",
          { withCredentials: true }
        );
        if (res.data.success) {
          setTodoList(res.data.todoList);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTodos();
  }, []);

  return todoList;
};

export default useFetchTodo;
