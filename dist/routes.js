"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumb = void 0;
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
routes.get('/', (req, res) => {
    res
        .status(200)
        .send("Thank you to choose our app. Please add to the URL '/images?filename=FILENAME&width=WIDTH&height=HEIGHT' and replace uppercase content");
});
routes.get('/images', (req, res) => {
    const fileName = req.query.filename || '';
    let width = parseInt(req.query.width || '0');
    let height = parseInt(req.query.height || '0');
    if (!width || !height || !fileName.length) {
        res.status(400).send('Please check the parameters content');
    }
    getThumb(fileName, width, height)
        .then((path) => res.status(200).sendFile(path))
        .catch((error) => res.status(500).send(error));
});
function getThumb(fileName, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        let thumbPath = `${__dirname}/assets/thumbs/${fileName}_w-${width.toString()}_h-${height.toString()}.jpg`;
        return new Promise((resolve, reject) => {
            if (!fs_1.default.existsSync(thumbPath)) {
                (0, sharp_1.default)(`${__dirname}/assets/images/${fileName}.jpg`)
                    .resize(width, height)
                    .toFile(thumbPath, (err, info) => {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(thumbPath);
                });
            }
            else {
                resolve(thumbPath);
            }
        });
    });
}
exports.getThumb = getThumb;
exports.default = routes;
