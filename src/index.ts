import express from 'express';
import routes from './routes';

const app: express.Application = express();
const port: number = 3000;

app.use('/api', routes);

app.listen(port, (): any => {
  console.log(`server started at localhost:${port}`);
});

export default app;
