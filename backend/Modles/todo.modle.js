const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    status: String,
    desc: String,
    name: String,
    userId: String
}, {
    versionKey: false,
    timestamps: true
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };