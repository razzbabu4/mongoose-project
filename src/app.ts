import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.routes';
import { UserRoute } from './app/modules/user/user.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRoute);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

// console.log(process.cwd());
export default app;
