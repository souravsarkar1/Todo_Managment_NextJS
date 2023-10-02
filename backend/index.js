const express = require('express');
const { connection } = require('./db');
const cors = require('cors');
const { userRouter } = require('./Routes/user.routes');
const { todoRouter } = require('./Routes/todo.routes');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use("/todo",todoRouter)

app.listen(4500, async () => {
    try {
        await connection;
        console.log(`running at port no 4500`);
        console.log(`connected to db`);

    } catch (error) {
        console.log("something went to wrong");
        console.log(error);
    }
})