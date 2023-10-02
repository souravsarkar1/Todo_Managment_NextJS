const express = require('express');
const { auth } = require('../Middleware/useAuthticated.middleware');
const { TodoModel } = require('../Modles/todo.modle');
const { inputCheck } = require('../Middleware/TodoInput.middleware');

const todoRouter = express.Router();

todoRouter.use(auth);

todoRouter.post("/add",inputCheck, async (req, res) => {
    try {
        const todo = new TodoModel(req.body); 
        await todo.save(); 
        res.status(200).json({ msg: "New todo is added", todo });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

todoRouter.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find({userId : req.body.userId}); 
        res.status(200).json({ todos });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

todoRouter.delete("/delete/:id", async (req,res)=>{
    try {
        const dataID = req.params.id; // Get the data ID from the request parameters
        const deletedData = await TodoModel.findByIdAndDelete(dataID);

        if (!deletedData) {
            return res.status(404).json({ msg: 'Data not found' });
        }

        res.status(200).json({ msg: 'Data deleted successfully', deletedData });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
})


todoRouter.put("/update/:id", async (req, res) => {
    try {
        const todoId = req.params.id; // Get the todo ID from the request parameters
        const updatedData = req.body; // Get the updated data from the request body

        // Find the todo by ID and update its fields
        const todo = await TodoModel.findByIdAndUpdate(todoId, updatedData, {
            new: true, // Return the updated todo after the update operation
            runValidators: true, // Run validators to ensure updated data is valid
        });

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        res.status(200).json({ msg: 'Todo updated successfully', todo });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error: error.message });
    }
});


module.exports = {todoRouter};
