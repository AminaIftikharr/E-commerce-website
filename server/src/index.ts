import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

const startServer = async () => {
    try {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');

        const PORT = config.port || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

startServer();