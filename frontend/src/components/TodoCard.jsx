import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const TodoCard = ({ todo,todoList,setTodoList }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/todo/deleteTodo/${todo._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // setTodoList({ ...todoList, });
        setTodoList((prev)=> prev.filter((item)=> todo._id !== item._id))
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg  ring shadow-xl ring-gray-900/5 px-8 py-6 my-10 max-lg:my-3 text-center">
      <h2 className="text-gray-900 dark:text-white  text-base font-medium tracking-tight">
        {todo.title}
      </h2>
      <h2 className="text-gray-500 dark:text-gray-400  text-sm ">
        {todo.description}
      </h2>
      <div className="flex justify-center items-center mt-5 gap-10 text-[12px]">
        <button
          onClick={handleDelete}
          className="bg-white  font-bold px-2 py-1 ring-1 rounded-sm"
        >
          Delete
        </button>
        {/* <button className="bg-white font-bold px-2 py-1 ring-1 rounded-sm ">
          Edit
        </button> */}
      </div>
    </div>
  );
};

export default TodoCard;
