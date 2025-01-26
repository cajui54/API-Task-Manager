import TaskModel from '../models/task.model.mjs';
import { logStatus } from '../../utils/status-log.mjs';
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
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
    async getTaskById() {
        try {
            const id = this.req.params.id;
            const getTask = await TaskModel.findById({ _id: id });

            if (!getTask) {
                console.log(
                    logStatus.error('[Delete]: task has been not found')
                );

                return this.res
                    .status(404)
                    .send('Essa tarefa não foi encontrada.');
            }
            console.log(logStatus.sucess('[GET] get a task by id'));

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
    async createTask() {
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
}

export default TaskController;
