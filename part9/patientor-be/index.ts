import express from 'express';
import cors from 'cors';
import { Request } from "express";

const app = express();
app.use(cors<Request>());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
