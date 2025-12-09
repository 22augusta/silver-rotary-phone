import express from 'express';
import { livroRouter } from './controller/LivroController';

export const app = express();
app.use(express.json());

app.use('/api/livros', livroRouter);
