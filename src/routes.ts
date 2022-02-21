import express from 'express';
const routes = express.Router();
import { getThumb } from './utilities';

routes.get('/', (req: express.Request, res: express.Response): any => {
  res
    .status(200)
    .send(
      "Thank you to choose our app. Please add to the URL '/images?filename=FILENAME&width=WIDTH&height=HEIGHT' and replace uppercase content"
    );
  return;
});

routes.get('/images', (req: express.Request, res: express.Response): any => {
  const fileName: string = (req.query.filename as string) || '';
  let width: number = parseInt((req.query.width as string) || '0');
  let height: number = parseInt((req.query.height as string) || '0');
  if (!width || !height || !fileName.length) {
    res.status(400).send('Please check the parameters content');
    return;
  }
  getThumb(fileName, width, height)
    .then((path) => res.status(200).sendFile(path))
    .catch((error) => res.status(500).send(error));
});

export default routes;
