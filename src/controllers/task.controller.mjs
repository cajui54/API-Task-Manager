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
}

export default TaskController;
