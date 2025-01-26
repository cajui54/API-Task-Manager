import TaskModel from '../models/task.model.mjs';
import { logStatus } from '../../utils/status-log.mjs';
import { notFoundError } from '../errors/mongodb.errors.mjs';
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            console.log(logStatus.sucess('[GET]: request all tasks'));
            return this.res.status(200).json(tasks);
        } catch (error) {
            console.log(
                logStatus.error(
                    '[GET]: ocurred an error unexpected: \n' + error.message
                )
            );
            return this.res.status(500).send(error.message);
        }
    }
    async getById() {
        try {
            const id = this.req.params.id;
            const getTask = await TaskModel.findById({ _id: id });

            if (!getTask) {
                return notFoundError(this.res);
            }

            return this.res.status(200).json(getTask);
        } catch (error) {
            console.log(
                logStatus.error(
                    '[GET]: ocurred an error unexpected: \n' + error.message
                )
            );
            return this.res.status(500).send(error.message);
        }
    }
    async create() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();
            console.log(
                logStatus.warning(
                    `[POST] the ${logStatus.run(
                        newTask.description
                    )} task has been created!`
                )
            );

            return this.res.status(201).send(newTask);
        } catch (error) {
            console.log(
                logStatus.error(
                    '[POST]: ocurred an error unexpected: \n' + error.message
                )
            );
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const id = this.req.params.id;

            const taskToDelete = await TaskModel.findById({ _id: id });

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(id);
            return this.res.status(200).send(deletedTask);
        } catch (error) {
            console.log(
                logStatus.error(
                    '[Delete]: ocurred an error unexpected: \n' + error.message
                )
            );
            return this.res.status(500).send(error.message);
        }
    }
    async update() {
        try {
            const id = this.req.params.id;
            const taskData = this.req.body;
            const getTask = await TaskModel.findById(id);

            if (!getTask) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ['isCompleted'];
            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowedUpdates.includes(update)) {
                    getTask[update] = taskData[update];
                } else {
                    return this.res.getTaskByIdres
                        .status(500)
                        .send('Um ou mais campos inseridos não são editáveis.');
                }
            }
            console.log(logStatus.sucess('[PATCH] Update task'));
            await getTask.save();
            return this.res.status(200).send(getTask);
        } catch (error) {
            console.log(
                logStatus.error(
                    '[Delete]: ocurred an error unexpected: \n' + error.message
                )
            );
            return this.res.status(500).send(error.message);
        }
    }
}

export default TaskController;
