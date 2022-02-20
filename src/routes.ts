import express from 'express';   
const routes = express.Router();
import sharp from 'sharp';
import fs from 'fs';

routes.get('/images', async (req, res) => {
  let fileName: string = req.query.filename as string; 
  let width: number = parseInt(req.query.width as string); 
  let height: number = parseInt(req.query.height as string);
  let thumbPath: string = `${__dirname}/assets/thumbs/${fileName}_w-${width.toString()}_h-${height.toString()}.jpg`;
  if (!fs.existsSync(thumbPath)) {
    await sharp(`${__dirname}/assets/images/${fileName}.jpg`).resize(width, height).toFile(thumbPath);
  }
  res.sendFile(thumbPath);
});

export default routes;