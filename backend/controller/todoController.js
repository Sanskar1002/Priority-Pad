import { Todo } from "../modals/todoModel.js";

export const createTodo = async(req,res)=>{
   try {
    const {title,description} = req.body;
    const userId = req.id;
    if(!title || !description)
    {
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        });
    }
    const todo = new Todo({title,description,userId});
    await todo.save();

    return res.status(201).json({
        success:true,
        message:"Todo created successfully ",
        todo
    })
   } catch (error) {
    console.log(error)
   }

}

export const getAllTodo = async(req,res)=>{
    try {
        const userId = req.id;
        const todoList = await Todo.find({userId});
        return res.status(200).json({
            success:true,
            todoList
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async(req,res)=>{
    try {
        const todoId = req.params.id;
    const result = await Todo.deleteOne({_id:todoId});
    // console.log(result)
    return res.status(200).json({
        success:true,
        message:"Todo deleted successfully"
    })
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async(req,res)=>{
    try {
        const todoId = req.params.id;
        const {title,description} = req.body;
        const todo = await Todo.findByIdAndUpdate(todoId,{title,description})
        await todo.save();
        return res.status(200).json({
            success:true,
            message:"Todo updated successfully"
        })
    } catch (error) {
        console.log(error)
    }
}