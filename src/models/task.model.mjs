import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
