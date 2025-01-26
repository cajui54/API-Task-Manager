import express from 'express';
import TaskController from '../controllers/task.controller.mjs';

const TaskRouter = express.Router();

TaskRouter.get('/', async (req, res) => {
    return new TaskController(req, res).getAll();
});

TaskRouter.get('/:id', async (req, res) => {
    return new TaskController(req, res).getById();
});

TaskRouter.post('/', async (req, res) => {
    return new TaskController(req, res).create();
});

TaskRouter.patch('/:id', async (req, res) => {
    return new TaskController(req, res).update();
});

TaskRouter.delete('/:id', async (req, res) => {
    return new TaskController(req, res).delete();
});

export default TaskRouter;
