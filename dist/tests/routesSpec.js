"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../routes");
describe("Image transform function should resolve or reject", () => {
    it("expect transform to NOT throw errors", () => {
        (0, routes_1.getThumb)("fjord", 200, 200)
            .then((result) => {
            expect(result).not.toEqual("Input file is missing");
        })
            .catch((_) => null);
    });
    it("expect transform to throw errors", () => {
        (0, routes_1.getThumb)("fjor", 200, 200)
            .then((result) => {
            expect(result).toEqual("Input file is missing");
        })
            .catch((_) => null);
    });
});
