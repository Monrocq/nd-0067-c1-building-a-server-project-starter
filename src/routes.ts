import express from 'express';
const routes = express.Router();
import sharp from 'sharp';
import fs from 'fs';

routes.get('/', (req, res) => {
  res
    .status(200)
    .send(
      "Thank you to choose our app. Please add to the URL '/images?filename=FILENAME&width=WIDTH&height=HEIGHT' and replace uppercase content"
    );
});

routes.get('/images', (req, res) => {
  const fileName: string = (req.query.filename as string) || '';
  let width: number = parseInt((req.query.width as string) || '0');
  let height: number = parseInt((req.query.height as string) || '0');
  if (!width || !height || !fileName.length) {
    res.status(400).send('Please check the parameters content');
  }
  getThumb(fileName, width, height)
    .then((path) => res.status(200).sendFile(path))
    .catch((error) => res.status(500).send(error));
});

export async function getThumb(
  fileName: string,
  width: number,
  height: number
): Promise<string> {
  let thumbPath: string = `${__dirname}/assets/thumbs/${fileName}_w-${width.toString()}_h-${height.toString()}.jpg`;
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(thumbPath)) {
      sharp(`${__dirname}/assets/images/${fileName}.jpg`)
        .resize(width, height)
        .toFile(thumbPath, (err, info) => {
          if (err) {
            reject(err.message);
          }
          resolve(thumbPath);
        });
    } else {
      resolve(thumbPath);
    }
  });
}

export default routes;
