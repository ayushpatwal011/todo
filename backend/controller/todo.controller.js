import Todo from "../model/todo.model.js";

export const createTodo = async (req,res)=>{
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json({message:"Todo is created Successfully",newTodo});
    } catch (error) {
        res.status(400).json({message:"Error in creating Todo"});
    }
}