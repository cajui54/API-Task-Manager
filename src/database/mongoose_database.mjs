import mongoose from 'mongoose';
import { logStatus } from '../../utils/status-log.mjs';
const connectToDatabase = async () => {
    try {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;

        const connectString = `mongodb+srv://${username}:${password}@cluster0.sxxmt.mongodb.net/tasks_Database?retryWrites=true&w=majority&appName=Cluster0`;

        mongoose.set('strictQuery', false);
        await mongoose.connect(connectString);

        console.log(logStatus.sucess('Connecte to MongleDB'));
    } catch (error) {
        console.log(logStatus.error(error));
    }
};
export default connectToDatabase;
