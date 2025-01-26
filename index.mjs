import dotenv from 'dotenv';

import express from 'express';

import { logStatus } from './utils/status-log.mjs';
import connectToDatabase from './src/database/mongoose_database.mjs';
import TaskRouter from './src/routes/task.routes.mjs';

dotenv.config();

const app = express();
app.use(express.json());
const port = 8000;
connectToDatabase();

app.use('/tasks', TaskRouter);

app.listen(port, () => {
    console.log(logStatus.run(`server is running on port ${port}`));
});
