import sharp from 'sharp';
import fs from 'fs';

export async function getThumb(
  fileName: string,
  width: number,
  height: number
): Promise<string> {
  let thumbPath: string = `${__dirname}/assets/thumbs/${fileName}_w-${width.toString()}_h-${height.toString()}.jpg`;
  return new Promise((resolve, reject) => {
    fs.access(thumbPath, (err) => {
      if (err) {
        sharp(`${__dirname}/assets/images/${fileName}.jpg`)
          .resize(width, height)
          .toFile(thumbPath, (err, _) => {
            if (err) {
              reject(err.message);
            }
            resolve(thumbPath);
          });
      } else {
        resolve(thumbPath);
      }
    });
  });
}
