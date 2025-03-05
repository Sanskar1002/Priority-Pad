import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TodoItems = ({ todoList, setTodoList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleAddTodo = async () => {
    // console.log(title, description);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/createTodo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodoList([...todoList, res.data.todo]);
        setTitle("");
        setDescription("");
        console.log(res);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center gap-8 h-">
      <div className="flex flex-col justify-center items-center gap-8">
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={handleTitle}
          className="bg-gray-950 text-white px-4 py-2 rounded-sm"
        />
        <textarea
          rows="2"
          cols="50"
          maxLength={150}
          value={description}
          placeholder="Enter description"
          className="bg-gray-950 text-white px-4 py-2 rounded-sm w-full resize-none"
          onChange={handleDesc}
        />
      </div>
      <button
        onClick={handleAddTodo}
        className="bg-gray-200 px-12 py-2 rounded-full ring-2 ring-gray-800"
      >
        Add
      </button>
    </div>
  );
};

export default TodoItems;
