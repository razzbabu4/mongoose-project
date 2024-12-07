import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler';
import notFound from './app/modules/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const getAController = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

// global error handler
app.use(globalErrorHandler);

// not found from middleware
app.use(notFound);

export default app;

// console.log(process.cwd());
