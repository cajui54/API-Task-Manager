import dotenv from 'dotenv';

import express from 'express';

import { logStatus } from './utils/status-log.mjs';
import connectToDatabase from './src/database/mongoose_database.mjs';

dotenv.config();
const app = express();
const port = 8000;
connectToDatabase();
app.get('/tasks', (req, res) => {
    res.status(200).json({ description: 'Study JS', isCompleted: false });
});

app.listen(port, () => {
    console.log(logStatus.run(`server is running on port ${port}`));
});
