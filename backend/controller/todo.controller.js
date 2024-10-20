import Todo from "../model/todo.model.js";

const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo is created Successfully", newTodo });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error in creating Todo" });
    }
}
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(201).json({ message: "Todo is created Successfully", todos });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error in creating Todo" });
    }
}
const updateTodo = async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(201).json({ message: "Todo is updated Successfully", updateTodo });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error in updating Todo" });
    }
}
const deleteTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "Todo is deleted Successfully"});
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error in deleting Todo" });
    }
}
export { createTodo, getTodos, updateTodo, deleteTodo }