import dotenv from 'dotenv';

import express from 'express';

import { logStatus } from './utils/status-log.mjs';
import connectToDatabase from './src/database/mongoose_database.mjs';
import TaskModel from './src/models/task.model.mjs';

dotenv.config();
const app = express();
app.use(express.json());
const port = 8000;
connectToDatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        console.log(logStatus.sucess('[GET]: request all tasks'));
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(
            logStatus.error(
                '[GET]: ocurred an error unexpected: \n' + error.message
            )
        );
        return res.status(500).send(error.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();
        console.log(
            logStatus.warning(
                `the ${logStatus.run(
                    newTask.description
                )} task has been created!`
            )
        );

        return res.status(201).send(newTask);
    } catch (error) {
        console.log(
            logStatus.error(
                '[POST]: ocurred an error unexpected: \n' + error.message
            )
        );
        return res.status(500).send(error.message);
    }
});
app.listen(port, () => {
    console.log(logStatus.run(`server is running on port ${port}`));
});
