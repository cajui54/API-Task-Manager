import express from 'express';

import TaskController from '../controllers/task.controller.mjs';
import TaskModel from '../models/task.model.mjs';
import { logStatus } from '../../utils/status-log.mjs';
const TaskRouter = express.Router();

TaskRouter.get('/', async (req, res) => {
    return new TaskController(req, res).getTasks();
});

TaskRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getTask = await TaskModel.findById({ _id: id });

        if (!getTask) {
            console.log(logStatus.error('[Delete]: task has been not found'));

            return res.status(404).send('Essa tarefa não foi encontrada.');
        }
        console.log(logStatus.sucess('[GET] get a task by id'));

        return res.status(200).json(getTask);
    } catch (error) {
        console.log(
            logStatus.error(
                '[GET]: ocurred an error unexpected: \n' + error.message
            )
        );
        return res.status(500).send(error.message);
    }
});

TaskRouter.post('/', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();
        console.log(
            logStatus.warning(
                `[POST] the ${logStatus.run(
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

TaskRouter.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const taskData = req.body;
        const getTask = await TaskModel.findById({ _id: id });

        if (!getTask) {
            console.log(logStatus.error('[Delete]: task has been not found'));

            return res.status(404).send('Essa tarefa não foi encontrada.');
        }

        const allowedUpdates = ['isCompleted'];
        const requestedUpdate = Object.keys(taskData);

        for (const update of requestedUpdate) {
            if (allowedUpdates.includes(update)) {
                getTask[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send('Um ou mais campos inseridos não são editáveis.');
            }
        }
        console.log(logStatus.sucess('[PATCH] Update task'));
        await getTask.save();
        return res.status(200).send(getTask);
    } catch (error) {
        console.log(
            logStatus.error(
                '[Delete]: ocurred an error unexpected: \n' + error.message
            )
        );
        return res.status(500).send(error.message);
    }
});

TaskRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const taskToDelete = await TaskModel.findById(id);

        if (!taskToDelete) {
            console.log(logStatus.error('[Delete]: task has been not found'));

            return res.status(404).send('Essa tarefa não foi encontrada.');
        }
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        return res.status(200).send(deletedTask);
    } catch (error) {
        console.log(
            logStatus.error(
                '[Delete]: ocurred an error unexpected: \n' + error.message
            )
        );
        return res.status(500).send(error.message);
    }
});

export default TaskRouter;
