import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', getAController);

// console.log(process.cwd());
export default app;
