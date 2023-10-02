const express = require('express');
const { auth } = require('../Middleware/useAuthticated.middleware');
const { TodoModel } = require('../Modles/todo.modle');

const app = express.Router();


app.use(auth);


app.post("/add", async (req, res) => {
    try {
        const todo = await TodoModel(req.body);
        todo.save();
        res.status(200).json({ msg: "new todo is added", todo });
    } catch (error) {
        res.status(400).json({ error })
    }
})